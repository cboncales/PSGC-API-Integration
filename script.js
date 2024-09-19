const container = document.getElementById("container");
const overlayCon = document.getElementById("overlayCon");
const overlayBtn = document.getElementById("overlayBtn");

overlayBtn.addEventListener("click", () => {
  container.classList.toggle("right-panel-active");

  overlayBtn.classList.remove("btnScaled");
  window.requestAnimationFrame(() => {
    overlayBtn.classList.add("btnScaled");
  });
});

var selectedRegionCode = null;
var selectedProvinceCode = null;
var selectedCityCode = null;
var selectedBarangayCode = null;

var apiEndpoints = {
  region: "https://psgc.gitlab.io/api/regions/",
  provinces: "https://psgc.gitlab.io/api/provinces/",
  cities: "https://psgc.gitlab.io/api/cities/",
  barangays: "https://psgc.gitlab.io/api/barangays/",
};

// Populate regions dropdown
axios
  .get(apiEndpoints.region)
  .then(function (response) {
    var regions = response.data;
    var regionDropdownMenu = document.getElementById("region");

    regions.forEach(function (region) {
      var option = document.createElement("option");
      option.value = region.code;
      option.textContent = region.name;
      regionDropdownMenu.appendChild(option);
    });

    regionDropdownMenu.addEventListener("change", function () {
      selectedRegionCode = this.value;
      populateProvinces(selectedRegionCode);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

// Populate provinces based on selected region
function populateProvinces(regionCode) {
  axios
    .get(apiEndpoints.provinces)
    .then(function (response) {
      var provinceDropdownMenu = document.getElementById("province");
      provinceDropdownMenu.innerHTML =
        "<option selected>Select Province</option>";

      var filteredProvinces = response.data.filter(function (province) {
        return province.regionCode === regionCode;
      });

      filteredProvinces.forEach(function (province) {
        var option = document.createElement("option");
        option.value = province.code;
        option.textContent = province.name;
        provinceDropdownMenu.appendChild(option);
      });

      provinceDropdownMenu.addEventListener("change", function () {
        selectedProvinceCode = this.value;
        populateCities(selectedProvinceCode);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Populate cities based on selected province
function populateCities(provinceCode) {
  axios
    .get(apiEndpoints.cities)
    .then(function (response) {
      var cityDropdownMenu = document.getElementById("cityMunicipality");
      cityDropdownMenu.innerHTML =
        "<option selected>Select City/Municipality</option>";

      var filteredCities = response.data.filter(function (city) {
        return city.provinceCode === provinceCode;
      });

      filteredCities.forEach(function (city) {
        var option = document.createElement("option");
        option.value = city.code;
        option.textContent = city.name;
        cityDropdownMenu.appendChild(option);
      });

      cityDropdownMenu.addEventListener("change", function () {
        selectedCityCode = this.value;
        populateBarangays(selectedCityCode);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Populate barangays based on selected city
function populateBarangays(cityCode) {
  axios
    .get(apiEndpoints.barangays)
    .then(function (response) {
      var barangayDropdownMenu = document.getElementById("barangay");
      barangayDropdownMenu.innerHTML =
        "<option selected>Select Barangay</option>";

      var filteredBarangays = response.data.filter(function (barangay) {
        return barangay.cityCode === cityCode;
      });

      filteredBarangays.forEach(function (barangay) {
        var option = document.createElement("option");
        option.value = barangay.code;
        option.textContent = barangay.name;
        barangayDropdownMenu.appendChild(option);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Form submission logic
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.onclick = (e) => {
  e.preventDefault(); // Prevent form submission

  const firstName = document.getElementById("firstName").value.trim();
  const middleName = document
    .querySelector('input[placeholder="Middle Name"]')
    .value.trim();
  const lastName = document
    .querySelector('input[placeholder="Last Name"]')
    .value.trim();
  const email = document.querySelector('input[type="email"]').value.trim();
  const username = document
    .querySelector('input[placeholder="User name"]')
    .value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();
  const birthdate = document.getElementById("birthdate").value.trim();
  const region = document.getElementById("region").value.trim();
  const province = document.getElementById("province").value.trim();
  const city = document.getElementById("cityMunicipality").value.trim();
  const barangay = document.getElementById("barangay").value.trim();
  const sex = document.getElementById("sex").value.trim();

  // Ensure all required fields are filled
  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    !confirmPassword ||
    !birthdate ||
    !region ||
    !province ||
    !city ||
    !barangay ||
    !sex
  ) {
    alert("Please fill out all required fields.");
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  // If all fields are correctly filled and passwords match
  alert("Registered successfully!");
};
