let PORT="https://event-proposal-backend-2023.onrender.com/"
function PostApi(data) {
  return fetch(`${PORT}api/createProposal`, {
    headers: { "Authorization":localStorage.getItem("headers")},
    method: "POST",
    body: data,
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    }
  });
}

function GetApi() {
  return fetch(`${PORT}api/getproposal`).then((data) =>
    data.json()
  );
}

function PutApi(data, id) {
  return fetch(`${PORT}api/updateproposal/${id}`, {
    method: "PUT",
    body: data,
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    }
  });
}

function DeleteApi(id) {
  return fetch(`${PORT}api/deleteproposal/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      return e.json();
    });
}

export { PostApi, GetApi, PutApi, DeleteApi,PORT};
