var deletingId=null;
const items=document.getElementById('container')
const load=window.addEventListener("DOMContentLoaded",loadData)


function loadData()
{
  const parentElement=document.getElementById('container')
  axios.get("https://crudcrud.com/api/4c90820091c54f308df449bac41e4dbe/savedata")
  .then((res)=>{
  
      const parentElement=document.getElementById('container')
    
     
      for(var i=0;i<res.data.length;i++)
      {
        childElement=`<li id=${res.data[i]._id}>${res.data[i].name}-${res.data[i].email}-${res.data[i].phone}<button onclick="deleteData('${res.data[i]._id}')">Delete</button>
        <button onclick="editData('${res.data[i]._id}','${res.data[i].name}','${res.data[i].email}','${res.data[i].phone}')">Edit</button></li>`
        parentElement.innerHTML=parentElement.innerHTML+childElement;
      }
  }).catch((err)=>{
      parentElement.innerHTML=`<h3>Something is wrong in getting data</h3>`
  })
}
 

function deleteData(id) {
  console.log(id);
  axios.delete(`https://crudcrud.com/api/4c90820091c54f308df449bac41e4dbe/savedata/${id}`)
  .then((res) => {
    console.log("Item is deleted");
    document.getElementById(id).remove();
    
  })
  .catch((error) => {
    console.log("Error while deleting item: ", error);
  });
}

function editData(id,name,email,phone)
{
  console.log(name,email,phone,id);
  document.getElementById("name").value=name;
  document.getElementById("email").value=email;
  document.getElementById("phone").value=phone;
  deletingId=id; 
}
  
const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", savedata) 

function savedata(event){
  event.preventDefault(); // Prevents the form from submitting normally

  // Get the values from the form 
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const obj={
    name,
    email,
    phone,
  }
  if(deletingId==null)
  {
    axios.post("https://crudcrud.com/api/4c90820091c54f308df449bac41e4dbe/savedata",obj)
    .then((res)=>{
        alert("submitted")
        console.log("Submit")

    }).catch((err)=>{
        alert("error")
    })
  }
  else
  {        
    console.log(deletingId);
    axios.put(`https://crudcrud.com/api/4c90820091c54f308df449bac41e4dbe/savedata/${deletingId}`,obj)
    .then((res)=>{
      console.log(res);
      console.log("editdata")
    }).catch((error)=>{
      console.log(error);
    })
  deletingId=null;
  window.location.reload();
  }   
}