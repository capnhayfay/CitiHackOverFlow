import {LineGraph} from "../components/LineGraph"
import prices from '../components/data/data.json'

export const Dashboard=()=>{

    return(
        <div>
            <LineGraph data={dataArr}/>
        </div>
    )

}