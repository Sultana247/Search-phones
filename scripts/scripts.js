const loadPhones = async(searchText, isShowAll)=> {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    
    const data =await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones =(phones, isShowAll)=>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent ='';
    console.log(phones.length);
    const showAllcontainer = document.getElementById('showallContainer');
    if(phones.length > 12 && !isShowAll){
        
        
        showAllcontainer.classList.remove('hidden');
    }
    else{
        showAllcontainer.classList.add('hidden');
    }
    // show all if button is clicked
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    
    phones.forEach(phone => {
        
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('card','bg-base-100', 'w-96', 'shadow-sm');
        phoneCard.innerHTML=`
                <figure>
                    <img
                    src="${phone.image}"
                    alt="Shoes" />
                </figure>
                <div class="card-body w-full flex flex-col justify-center items-center text-center">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>There are many variations of passages of available, but the majority have suffered</p>
                    <div class="card-actions ">
                    <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
        
        `;
        phoneContainer.appendChild(phoneCard);
        toggleLodingSpinner(false);
    });
    
}


const searchPhones = (isShowAll)=> {
    const searchPhones = document.getElementById('searchPhones');
    const searchPhonesText = searchPhones.value;
    loadPhones(searchPhonesText, isShowAll);
    toggleLodingSpinner(true);
}

const showAll = ()=>{
    searchPhones(true);
}

const toggleLodingSpinner = (isLoading)=>{
    const toggleLodingSpinner = document.getElementById('toggleLodingSpinner');
    if(isLoading){
        toggleLodingSpinner.classList.remove('hidden');
    }
    else{
        toggleLodingSpinner.classList.add('hidden');
    }
}