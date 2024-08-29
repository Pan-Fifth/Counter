function App(){
    const [counters,setCounter] = React.useState([
        {id: 1, value:0},
        {id: 2, value:0},
        {id: 3, value:0},
        {id: 4, value:0},
    ])
    let [sum,setSum]=React.useState(0)

    function hdlClk(n,id){
        const newCounters = [...counters]
        const idx = newCounters.findIndex(el=>el.id==id)
        if(newCounters[idx].value<=0 && n<0){
            return
        }else {
            newCounters[idx].value += n;
            sum=0;
            newCounters.forEach(el=>{
                sum = el.value+sum
                setSum(sum)
            })
            setCounter(newCounters)
        }
        
    }
    function hdlDel(id){
        console.log(counters.length)
        if(counters.length>1){
            let newArr = counters.filter(el=>el.id!=id)
            sum = 0;
            newArr.forEach(el=>{
                sum = el.value+sum
                setSum(sum)
            })
            setCounter(newArr)
        }
    }

    function hdlAdd(){
        const newArr = [...counters]
        newArr.push({id:counters[counters.length-1].id+1,value:0})
        console.log(counters.length)
        console.log(counters)
        setCounter(newArr)
    }

    return(
        <div>
            <button onClick={()=>hdlAdd()}>Add Counter</button>
            <h1>Sum = {sum}</h1>
            <CreateMap counters = {counters} hdlClk = {hdlClk} hdlDel = {hdlDel}/>
        </div>
    )
}


function CreateMap (props){
    // console.log(props)
    const {counters,hdlClk,hdlDel} = props
    return(
        <div>
            {
                counters.map(el=>(
                    <UpdateCounter id={el.id} value={el.value} hdlClk = {hdlClk} hdlDel = {hdlDel}/>
                ))
            }

        </div>
    )
}

function UpdateCounter (props){
    console.log(props)
    const {id,value,hdlClk,hdlDel} = props
    return(
        <div className = 'counter'>
            <button onClick={()=>hdlClk(-1,id)}>-</button>
            <p>{value}</p>
            <button onClick={()=>hdlClk(+1,id)}>+</button>
            <button onClick={()=>hdlClk(-value,id)}>C</button>
            <button onClick={()=>hdlDel(id)}>X</button>
        </div>
    )
}



ReactDOM.createRoot(document.querySelector('#root')).render(<App />);


