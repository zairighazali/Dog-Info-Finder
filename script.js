/*
Write an async function called findDog() that:
Gets the dog ID from the input field.
Validates that an ID is entered (show an error if it is blank).
Uses fetch() to call the API: https://dog-vidi.vercel.app/dogs/{id}
If the response is successful, displays the dog's name, breed, and age in the #dogInfo div using template literals.
If the response is not ok (invalid ID), displays "Dog not found!".
Use try...catch to handle errors and show "Dog not found!" if the API call fails.
Style the dog's age dynamically:
Age ≤ 3 → text color should be green
Age > 3 → text color should be blue
Use an inline onclick attribute on the button in index.html instead of addEventListener to call findDog().
*/

async function findDog() {
  // get the dog ID from input
  const dogIdInput = document.getElementById('dogId');
  const dogInfoDiv = document.getElementById('dogInfo');
  const dogId = dogIdInput.value.trim();

  // validation: make sure ID is entered
  if (!dogId) {
    dogInfoDiv.innerHTML = "<span style='color:red;'>Please enter a Dog ID!</span>";
    return;
  }

  try {
    // fetch dog data from API
    const response = await fetch(`https://dog-vidi.vercel.app/dogs/${dogId}`);

    if (response.ok) {
      const dog = await response.json();

      // dynamic age color
      const ageColor = dog.age <= 3 ? 'green' : 'blue';

      // display dog info
      dogInfoDiv.innerHTML = `
        <p><strong>Name:</strong> ${dog.name}</p>
        <p><strong>Breed:</strong> ${dog.breed}</p>
        <p><strong>Age:</strong> <span style="color:${ageColor}">${dog.age}</span></p>
      `;
    } else {
      // invalid ID
      dogInfoDiv.textContent = "Dog not found!";
    }
  } catch (error) {
    // handle fetch/network errors
    dogInfoDiv.textContent = "Dog not found!";
    console.error(error);
  }
}
