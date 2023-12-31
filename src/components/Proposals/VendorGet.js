import React, { useContext, useEffect, useState } from "react";
import "./VendorGet.css";
import search from "../../assets/search.jpg";
import edit from "../../assets/pencil-edit-button.jpg";
import dele from "../../assets/delete.jpg";
import { DeleteApi, GetApi } from "./Api_call";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import EventContext from "../users/context/EventContext";

function VendorGet() {
  let api_update = useContext(EventContext);
  let formHandling=useContext(EventContext);
 
  let navigate = useNavigate();
  let [sample, setSample] = useState(false);
  let [propose, setPropose] = useState([]);
  useEffect(() => {
    GetApi().then((data) => {
      setPropose(data.data);
      if (
        !localStorage.getItem("headers") &&
        !localStorage.getItem("vendorlogin")
      ) {
        navigate("/");
      }
    });
  }, [sample]);
  let rev = propose.reverse();
  return (
    <div id="all-container">
      <Navbar />
      <div id="pro-container">
        <div id="bar">
          <h5>Proposals</h5>
          <div style={{ marginLeft: "20px" }}>
            <img src={search} alt="searchicon" />
          </div>
          <input type="text" placeholder="search" />
          <div
            id="popup"
            onClick={() => {
              api_update.Updation({ id: "", type: "POST" });
              formHandling.EventsUpdate("");
              formHandling.FoodpreferancesUpdate("");
              formHandling.DescriptionUpdate("");
              formHandling.ToUpdate("");
              formHandling.FromUpdate("");
              formHandling.BudgetUpdate("");
              formHandling.EventTypeUpdate("");
              formHandling.ProposalTypeUpdate("");
              formHandling.PlaceofEventUpdate("");
              formHandling.EventNameUpdate("");
              navigate("/createproposal");
            }}
          >
            CREATE
          </div>
        </div>

        {rev.map((data, i) => {
          return (
            <div className="proposal" key={i}>
              <section id="section1">
                <h5>{data.Event_Name}</h5>
                <h6>{data.Description}</h6>
              </section>

              <section id="section2">
                <div className="border">
                  <div className="paddin">
                    <p className="bottom">Event Type</p>
                    <p className="zero-margin">{data.Event_type}</p>
                  </div>
                </div>

                <div className="border">
                  <div className="paddin">
                    <p className="bottom">Proposal Type</p>
                    <p className="zero-margin">{data.Proposal_type}</p>
                  </div>
                </div>
                <div className="border">
                  <div className="paddin">
                    <p className="bottom">From Date</p>
                    <p className="zero-margin">{data.From_date}</p>
                  </div>
                </div>
                <div className="border">
                  <div className="paddin">
                    <p className="bottom">To Date</p>
                    <p className="zero-margin">{data.To_date}</p>
                  </div>
                </div>
                <div className="border">
                  <div className="paddin">
                    <p className="bottom">Budget</p>
                    <p className="zero-margin">{data.Budget}</p>
                  </div>
                </div>

                <div id="edel">
                  <div>
                    <img
                      src={edit}
                      alt="editicon"
                      onClick={() => {
                        api_update.Updation({ id: data._id, type: "PUT" });
                        formHandling.EventsUpdate(data.Event_Name);
                        formHandling.FoodpreferancesUpdate(data.Food_preferances);
                        formHandling.DescriptionUpdate(data.Description);
                        formHandling.ToUpdate(data.To_date);
                        formHandling.FromUpdate(data.From_date);
                        formHandling.BudgetUpdate(data.Budget);
                        formHandling.EventTypeUpdate(data.Event_type);
                        formHandling.ProposalTypeUpdate(data.Proposal_type);
                        formHandling.PlaceofEventUpdate(data.Place_of_event);
                        formHandling.EventNameUpdate(data.Event_Name);
                        navigate("/createproposal");
                      }}
                    />
                  </div>
                  <div>
                    <img
                      style={{ marginLeft: "20px" }}
                      src={dele}
                      alt="deleteicon"
                      onClick={() => {
                        DeleteApi(data._id).then((data) => {
                          console.log(data.message);
                          setSample((old) => !old);
                          alert(data.message);
                        });
                      }}
                    />
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VendorGet;
