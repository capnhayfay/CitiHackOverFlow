import transformers
import torch
import nest_asyncio
import json
import itertools
from torch import cuda, bfloat16
from transformers import pipeline
from transformers import StoppingCriteria, StoppingCriteriaList
from langchain.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import ElasticsearchStore
from langchain.llms import HuggingFacePipeline
from langchain.chains import ConversationalRetrievalChain
import server

device = f'cuda:{cuda.current_device()}' if cuda.is_available() else 'cpu'


def model_instantiation():
    model_id = 'meta-llama/Llama-2-13b-chat-hf'

    # set quantization configuration to load large model with less GPU memory
    # this requires the `bitsandbytes` library
    bnb_config = transformers.BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type='nf4',
        bnb_4bit_use_double_quant=True,
        bnb_4bit_compute_dtype=bfloat16
    )

    # begin initializing HF items, you need an access token
    hf_auth = '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'
    model_config = transformers.AutoConfig.from_pretrained(
        model_id,
        token=hf_auth
    )

    _model = transformers.AutoModelForCausalLM.from_pretrained(
        model_id,
        trust_remote_code=True,
        config=model_config,
        quantization_config=bnb_config,
        device_map='auto',
        token=hf_auth
    )

    # enable evaluation mode to allow model inference
    _model.eval()

    print(f"Model loaded on {device}")

    _tokenizer = transformers.AutoTokenizer.from_pretrained(
        model_id,
        token=hf_auth
    )

    return _model, _tokenizer


model, tokenizer = model_instantiation()

# Create a text classification pipeline for generating embeddings
text_classification_pipeline = pipeline(
    task="feature-extraction",
    model=model,
    tokenizer=tokenizer
)

stop_list = ['\nHuman:', '\n```\n']

stop_token_ids = [tokenizer(x)['input_ids'] for x in stop_list]

stop_token_ids = [torch.LongTensor(x).to(device) for x in stop_token_ids]


# Function to generate LLM embeddings
def generate_embeddings(text):
    _embeddings = text_classification_pipeline(text)
    return _embeddings[0]


# define custom stopping criteria object
class StopOnTokens(StoppingCriteria):
    def __call__(self, input_ids: torch.LongTensor, scores: torch.FloatTensor, **kwargs) -> bool:
        for stop_ids in stop_token_ids:
            if torch.eq(input_ids[0][-len(stop_ids):], stop_ids).all():
                return True
        return False


stopping_criteria = StoppingCriteriaList([StopOnTokens()])

generate_text = transformers.pipeline(
    model=model,
    tokenizer=tokenizer,
    return_full_text=True,  # langchain expects the full text
    task='text-generation',
    # we pass model parameters here too
    stopping_criteria=stopping_criteria,  # without this model rambles during chat
    temperature=0.1,  # 'randomness' of outputs, 0.0 is the min and 1.0 the max
    max_new_tokens=512,  # max number of tokens to generate in the output
    repetition_penalty=1.1  # without this output begins repeating
)


def new_embedding_docs():
    nest_asyncio.apply()

    links_file = open('links_list.json')
    names_file = open('name_list.json')

    link_list = json.load(links_file)
    name_list = json.load(names_file)

    list_links = [link_list.get(_) for _ in link_list if link_list.get(_) != []]

    list_links = list(itertools.chain.from_iterable(list_links))

    loader = WebBaseLoader(list_links)
    loader.requests_per_second = 8
    docs = loader.aload()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
    all_splits = text_splitter.split_documents(docs)

    return all_splits


model_name = "sentence-transformers/all-mpnet-base-v2"
model_kwargs = {"device": "cuda"}

embeddings = HuggingFaceEmbeddings(model_name=model_name, model_kwargs=model_kwargs)

# Define the Elasticsearch parameters
ELASTIC_PASSWORD = "RZKEkWHREwfb0ReAQMFLVO3d"
CLOUD_ID = ("deployment-name"
            ":dXMtZWFzdC0xLmF3cy5mb3VuZC5pbzo0NDMkZjE1NjU4MmJjOTJhNDYzZThkOTdlZDZiNzdmZDMzNTMkODQ"
            "xMzk9MWJiMDQwMWNiNDEwNDIwYWQ1ZDQ0NzJiNjEyYzE5ZjJmYzVkNTM5ZWI5ODZhYmY3OGNlMWUyYTY3NjZmM2MwMmY0NjMxYTJjNzQ=")
INDEX_NAME = "all_news_database"

vectorstore = ElasticsearchStore(
    embedding=embeddings,
    es_cloud_id=CLOUD_ID,
    index_name=INDEX_NAME,
    es_user="elastic",
    es_password=ELASTIC_PASSWORD
)

llm = HuggingFacePipeline(pipeline=generate_text)

chain = ConversationalRetrievalChain.from_llm(llm, vectorstore.as_retriever(), return_source_documents=True)


def main(tickers: dict, cVaR):
    nest_asyncio.apply()

    # Initialize chat history as an empty list
    chat_history = []

    stocks = list(tickers.keys())

    str_port_info = ""
    for _ in stocks:
        str_port_info += str(_) + " with weight " + str(tickers.get(_)) + ", "
    str_port_info = str_port_info.rstrip(", ")

    queries = [
        f'''Comment on this portfolio: {str_port_info}, with a Conditional Value at Risk of {cVaR}''',
        "What are the challenges faced by you foresee for this portfolio?",
        "Can you elaborate on these challenges?",
        "What are some alternative stocks you would recommend adding to this portfolio?",
        "Any reasons for picking these stocks?"
    ]

    for query in queries:
        result = chain({"question": query, "chat_history": chat_history})
        print(result['answer'])

        # Append the query and answer to the chat history for the next iteration
        chat_history.append((query, result["answer"]))


if __name__ == "__main__":
    main()
