const $zookeeperForm = document.querySelector("#zookeeper-form");
const $displayArea = document.querySelector("#display-area");

const printResults = (resultArr) => {
  console.log(resultArr);

  const animalHTML = resultArr.map(({ id, name, age, favoriteAnimal }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Age: ${age}<br/>
      Favorite Animal: ${
        favoriteAnimal.substring(0, 1).toUpperCase() +
        favoriteAnimal.substring(1)
      }<br/>
      </p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = animalHTML.join("");
};

const getZookeepers = (formData = {}) => {
  let queryUrl = "/api/zookeepers?";

  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });

  fetch(queryUrl)
    .then((response) => {
      if (!response.ok) {
        return alert(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then((zookeeperArr) => {
      console.log(zookeeperArr);
      printResults(zookeeperArr);
    });
};

// take  values from form in zookeepers.html and pass them as an object to getZookeepers()
// const handleGetZookeepersSubmit = (event) => {
//   event.preventDefault();
//   // names
//   const nameHTML = $zookeeperForm.querySelector('[name="name"]');
//   const name = nameHTML.value;
//   // age
//   const ageHTML = $zookeeperForm.querySelector('[name="age"]');
//   const age = ageHTML.value;
//   // creates object
//   const zookeeperObject = { name, age };

//   getZookeepers(zookeeperObject);
// };

//event listener
$zookeeperForm.addEventListener("submit", handleGetZookeepersSubmit);

// function call
getZookeepers();
