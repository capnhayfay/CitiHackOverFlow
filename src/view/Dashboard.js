import {LineGraph} from "../components/LineGraph"
import {PieChart} from "../components/PieChart"
import { Treemaps } from "../components/Treemaps"


export const Dashboard=()=>{
    return(
        <div style={{margin:15,display:'flex'}}>
            <div style={{display:"inline-block", padding:5, marginRight:150}}>
                <LineGraph />
                <PieChart/>
            </div>
            <div style={{display:"inline-block", padding:5}}>
                <Treemaps/>
            </div>

        </div>
    )

}