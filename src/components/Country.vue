<template>
    <div class="fun-fact-wrapper">
    <div class="fun-fact-box">
      <button @click="toggleCountry">Learn more about {{ country }}</button>
      <div v-if="toggleInfo" class="country-info">
        <h2>{{ country}}</h2>
        <p><strong>Capital:</strong> {{ countryData.capital }}</p>
        <p><strong>Region:</strong> {{ countryData.region }}</p>
        <p><strong>Subregion:</strong> {{ countryData.subregion }}</p>
        <p><strong>Population:</strong> {{ countryData.population }}</p>
        <p><strong>Area:</strong> {{ countryData.area }} km²</p>
      </div>
    </div>
    
</div>
  </template>
  
  
  <script>
  export default {
    props:{
        country:String
    },
    data() {

      return {
        countryData: null,
        toggleInfo:false
      };
    },

    methods: {
        toggleCountry(){
            if(!this.countryData){
                this.fetchCountryData();
               //had the  this.toggleInfo=true; here but needed to move it
            }else{
                this.toggleInfo=!this.toggleInfo;
            }
        },
      async getCountry(countryName) {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fulltext=true`);
        const data = await response.json();
  
        if (response.status !== 200) {
          throw new Error(data.message || "Error fetching country data.");
        }
  
        const countryApi = data[0];
        const countryData = {
          name: countryApi.name.common,
          capital: countryApi.capital && countryApi.capital[0],
          region: countryApi.region,
          subregion: countryApi.subregion,
          population: countryApi.population,
          area: countryApi.area,
          flag: countryApi.flags && countryApi.flags[0]
        };
  
        return countryData;
      },
      async fetchCountryData() {
        try {
          this.countryData = await this.getCountry(this.country);
          this.toggleInfo=true;
        } catch (error) {
          console.error(error);
          // Add more error handling
        }
      }
    },
    mounted(){

    },
    beforeDestroy(){

    }
  };
  </script>
<style scoped>
/* .fun-fact-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; 


}
 */
.fun-fact-box {
    
  font-family: 'Arial', sans-serif;
  border: 1px solid #efefef;
  border-radius: 5px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px;
  max-width: 300px;
  background: #fffbf3; 
  
}

button {
  cursor: pointer;
  background-color: var(--cigar-orange);
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px 10px;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover {
  background-color: var(--cigar-orange);
}

.country-info {
  margin-top: 10px;
  z-index: 1000;
  position: absolute; 
    top: 25%;
    left: 35%;
    background-color: var(--off-white);
  padding: 0 20px 0 20px;
}

h2 {
  font-size: 24px;
  color: #333;
  border-bottom: 2px dotted var(--cigar-orange);
  padding-bottom: 5px;
  margin-bottom: 5px;
}

p {
  color: #555;
  margin-bottom: 10px;
}

p strong {
  color: #333;
  font-weight: bold;
}
</style>
