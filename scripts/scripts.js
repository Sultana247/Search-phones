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
                    <button class="btn btn-primary" onclick="my_modal_1.showModal(); showDetails('${phone.slug}')">Buy Now</button>
                    
                    </div>
                </div>
        
        `;
        phoneContainer.appendChild(phoneCard);
        toggleLodingSpinner(false);
    });
    
}

// show details of phones
const showDetails = async(id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone=data.data;
    console.log(phone);

    // show the image of phone
    const phoneDetailsContainer = document.getElementById('phoneDetailsContainer');
    phoneDetailsContainer.innerHTML=`
         <img
            src="${phone.image}"
            alt="Shoes" 
            class="size-56 flex "/>
        <h3>${phone.name}</h3>
        <p class=""><span class="font-bold text-lg">Storage: </span>${phone.mainFeatures.storage}</p>
        <p class=""><span class="font-bold text-lg">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
        <p class=""><span class="font-bold text-lg">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
        <p class=""><span class="font-bold text-lg">Memory: </span>${phone?.mainFeatures?.memory}</p>
        <p class=""><span class="font-bold text-lg">Slug: </span>${phone?.slug}</p>
        <p class=""><span class="font-bold text-lg">Release date: </span>${phone?.releaseDate}</p>
        <p class=""><span class="font-bold text-lg">Brand: </span>${phone?.brand}</p>
        <p class=""><span class="font-bold text-lg">GPS: </span>${phone?.others?.GPS || 'No GPS'}</p>



    
    `;

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