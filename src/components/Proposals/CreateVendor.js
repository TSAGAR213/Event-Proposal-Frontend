import React, { useContext, useState } from "react";
import "./sample.css";
import { PostApi, PutApi } from "./Api_call";
import { useNavigate } from "react-router-dom";

import EventContext from "../users/context/EventContext";

function CreateVendor() {
  let api_update = useContext(EventContext);

  let formHandling = useContext(EventContext);
  let navigate = useNavigate();
  const [file, setFile] = useState();
  const [showImage, setShowImage] = useState(false);
  function handleChange(e) {
    setImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    setShowImage(true);
  }

  function Validation(data) {
    let { EventName, Budget } = data;

    if (!/^[A-Za-z ]+$/.test(EventName)) {
      return "EventName is not alphanumeric";
    }
    if (!/^\d+$/.test(Budget)) {
      return "Budget must contain only numbers";
    }
    return;
  }

  const [Image, setImage] = useState({});
 
  return (
    <div id="component-container">
      {/* <Navbar/> */}
      <div id="form-contain">
        <div id="hder">
          <h2 id="h2">Create Proposal</h2>
          <h1
            id="x"
            onClick={() => {
              navigate("/getproposal");
            }}
          >
            X
          </h1>
        </div>

        <hr style={{ margin: "0px" }} />
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            let data = {
              EventName: formHandling.EventName,
              Budget: formHandling.Budget,
            };
            let error = Validation(data);
            if (error) {
              alert(error);
            } else {
              let formdata = new FormData();
              formdata.append("Event_Name", formHandling.EventName);
              formdata.append("Place_of_event", formHandling.PlaceofEvent);
              formdata.append("Proposal_type", formHandling.ProposalType);
              formdata.append("Event_type", formHandling.EventType);
              formdata.append("Budget", formHandling.Budget);
              formdata.append("From_date", formHandling.From);
              formdata.append("To_date", formHandling.To);
              formdata.append("Description", formHandling.Description);
              formdata.append("Images", Image);
              formdata.append("Food_preferances", formHandling.Foodpreferances);
              formdata.append("Events", formHandling.Events);

              if (api_update.apiType["type"] === "PUT") {
                PutApi(formdata, api_update.apiType["id"])
                  .then((data) => {
                    console.log(data);
                    navigate("/getproposal");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              } else if (api_update.apiType["type"] === "POST") {
                PostApi(formdata)
                  .then((data) => {
                    console.log(data);
                    navigate("/getproposal");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            }
          }}
        >
          <div id="section-container">
            <section id="s1">
              <div id="evt-name">
                <label>Event Name</label>
                <br />
                <input
                  type="text"
                  id="event-name"
                  placeholder="Name"
                  value={formHandling.EventName}
                  onChange={(e) => {
                    formHandling.EventNameUpdate(e.target.value);
                  }}
                  required
                />
              </div>

              <br />
              <div className="ib" id="event-place">
                <label>Place of Event</label>
                <br />
                <select
                  onChange={(e) => {
                    formHandling.PlaceofEventUpdate(e.target.value);
                  }}
                  value={formHandling.PlaceofEvent}
                  required
                >
                  <option>Select</option>
                  <option>Banglore</option>
                  <option>Mysore</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                </select>
              </div>

              <div className="ib" id="proposal-type">
                <label>Proposal Type</label>
                <br />
                <select
                  onChange={(e) => {
                    formHandling.ProposalTypeUpdate(e.target.value);
                  }}
                  value={formHandling.ProposalType}
                  required
                >
                  <option>Select</option>
                  <option>Formal</option>
                  <option>Informal</option>
                  <option>Personal</option>
                  <option>Business</option>
                </select>
              </div>
              <br />
              <div id="event-type" className="ib">
                <label>Event Type</label>
                <br />
                <select
                  onChange={(e) => {
                    formHandling.EventTypeUpdate(e.target.value);
                  }}
                  value={formHandling.EventType}
                  required
                >
                  <option>Select</option>
                  <option>Marriage</option>
                  <option>Birthday</option>
                  <option>Reception</option>
                  <option>Business</option>
                </select>
              </div>
              <div id="budget" className="ib">
                <label>Budget</label>
                <br />
                <input
                  type="text"
                  placeholder="00000"
                  onChange={(e) => {
                    formHandling.BudgetUpdate(e.target.value);
                  }}
                  value={formHandling.Budget}
                  required
                />
              </div>
              <br />
              <div className="ib" id="from-date">
                <label>From</label>
                <br />
                <input
                  type="date"
                  onChange={(e) => {
                    formHandling.FromUpdate(e.target.value);
                  }}
                  value={formHandling.From}
                  required
                />
              </div>

              <div className="ib" id="To-date">
                <label>To</label>
                <br />
                <input
                  type="date"
                  onChange={(e) => {
                    formHandling.ToUpdate(e.target.value);
                  }}
                  value={formHandling.To}
                  required
                />
              </div>
              <br />

              <div id="description">
                <label>Description</label>
                <br />
                <input
                  type="text"
                  placeholder="Description"
                  id="Description"
                  onChange={(e) => {
                    formHandling.DescriptionUpdate(e.target.value);
                  }}
                  value={formHandling.Description}
                  required
                />
              </div>
            </section>

            <section id="s2">
              <div id="image">
                <label>Image</label>
                <input
                  type="file"
                  placeholder="Add"
                  id="imageadd"
                  onChange={handleChange}
                  required
                />
                {showImage && (
                  <div id="img-container">
                    <img id="preview-image" src={file} alt="event" />
                  </div>
                )}
              </div>

              <div id="Food-prefer">
                <label>Food preferances</label>
                <br />
                <input
                  type="text"
                  placeholder="Preferances"
                  id="Preferances"
                  onChange={(e) => {
                    formHandling.FoodpreferancesUpdate(e.target.value);
                  }}
                  value={formHandling.Foodpreferances}
                  required
                />
              </div>

              <div id="Events">
                <label>Events</label>
                <br />
                <input
                  type="text"
                  placeholder="Preferances"
                  id="events"
                  value={formHandling.Events}
                  onChange={(e) => {
                    formHandling.EventsUpdate(e.target.value);
                  }}
                  required
                />
              </div>
            </section>
          </div>
          <hr />
          <button id="submit" type="submit">
            POST
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateVendor;
