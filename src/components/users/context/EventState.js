import EventContext from "./EventContext"
import {useState} from "react";

const EventState = (props) => {
     
    const [select,setSelect] =useState([])
    let [apiType, setApitype] = useState({ id: "", type: "" });

    const [EventName, setEventName] = useState("");
    const [PlaceofEvent, setPlaceofEvent] = useState("");
    const [ProposalType, setProposalType] = useState("");
    const [EventType, setEventType] = useState("");
    const [Budget, setBudget] = useState("");
    const [From, setFrom] = useState("");
    const [To, setTo] = useState("");
    const [Description, setDescription] = useState("");
    const [Foodpreferances, setFoodpreferances] = useState("");
    const [Events, setEvents] = useState("");

    function EventNameUpdate(data)
    {
        setEventName(data)
    }
    function PlaceofEventUpdate(data)
    {
        setPlaceofEvent(data) 
    }
    function ProposalTypeUpdate(data)
    {
        setProposalType(data) 
    }
    function EventTypeUpdate(data)
    {
        setEventType(data) 
    }
    function BudgetUpdate(data)
    {
        setBudget(data) 
    }
    function FromUpdate(data)
    {
       setFrom(data) 
    }
    function ToUpdate(data)
    {
       setTo(data) 
    }
    function DescriptionUpdate(data)
    {
        setDescription(data) 
    }
    function FoodpreferancesUpdate(data)
    {
        setFoodpreferances(data) 
    }
    function EventsUpdate(data)
    {
        setEvents(data) 
    }
    function Updation(update) {
      setApitype(update);
    }
    const handleSelect = (proposal) => {
            setSelect(proposal)
    }
    return (
        <EventContext.Provider value={{select,handleSelect,
        apiType,Updation,Events,Foodpreferances,
        Image,Description,To,From,Budget,
        EventType,ProposalType,PlaceofEvent,EventName,
        EventNameUpdate,EventTypeUpdate,ProposalTypeUpdate,EventsUpdate,
        FoodpreferancesUpdate,ToUpdate,FromUpdate,DescriptionUpdate,
        BudgetUpdate,PlaceofEventUpdate
        }}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventState