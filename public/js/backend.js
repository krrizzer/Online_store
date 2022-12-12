
// The function brings the codes the fornt end (home page) Not yet implemented, and replaced with passing the codes with EJS
function showCodes() {

    let limit = 10;
    let page = 1;

    getCodes(0, limit)

    $('#moreButton').on('click', (evt) => {
        page++;
        let offset = (page - 1) * limit
        getCodes(offset, limit)
    })
}

 async function  getCodes(offset , limit) {

    const BASE_URL = '/codes';
    const response = await fetch(BASE_URL)
    console.log(response)
    
    let output = `<button type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#add-code-modal">
                    Add a New Code
                    </button>`
    if (response.ok){
        const list = await response.json();
        output= list.reverse().map((code) =>`                            
              <div class="col card m-3" style="width: 18rem">
                <img src="${code.image}" class="card-img-top" alt="..." height="200" />
                <div class="card-body">
                  <h5 class="card-title"> <strong>${code.brand}</strong> Redeem Card</h5>
                  <p class="card-text">Price: <strong>${code.price}</strong> SAR</p>
                  <a href="/edit/${code._id}" class="btn btn-primary">Edit</a>
                  <a href="/delete/${code._id}" class="btn btn-danger"
                    >Delete</a
                  >
                </div>
              </div>
        </div>
        `).join('')
    }

    const cards = document.getElementById('cards');
    cards.innerHTML =output
}


const addCode= async () => {
    const BASE_URL = '/codes';
    const newCode = {
        brand: document.getElementById('brand').value,
        price: document.getElementById('price').value,
        code: document.getElementById('code').value,
    }

        await fetch(BASE_URL,{
            headers:{
                'Content-Type':'Application/json'
            },
            method:'post',
            body:JSON.stringify({newCode: newCode})
        })


        brand.value=""
        price.value=""
        code.value=""

        const myModalEl = document.getElementById('add-code-modal');
        const modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
        await getCodes(0 , 10);
}

