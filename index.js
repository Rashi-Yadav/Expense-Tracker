const form = document.getElementById('expense');
form.addEventListener('submit', function(event){
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const desc = document.getElementById('desc').value;
    const category = document.getElementById('category').value;

    const date = new Date();
    const keyForObj = Number(`${date.getHours()}${date.getMinutes()}${date.getSeconds()}`);
    const obj = {keyForObj, amount, category, desc};
    localStorage.setItem(keyForObj, JSON.stringify(obj));

    displayExpences(obj);

    document.getElementById('amount').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('category').value = '';
});

window.addEventListener('DOMContentLoaded',function(){
    Object.keys(this.localStorage).forEach((val)=>{
        displayExpences(JSON.parse(this.localStorage.getItem(val)));
    });
});

function displayExpences(obj){
    const list = document.createElement('li');
    list.className = 'list-group-item list-group-item-dark';
    list.innerHTML = `Rs. ${obj.amount} - ${obj.category}<p style= "font-style:italic">Description: ${obj.desc}</p>`;

    const delbtn = document.createElement('button');
    delbtn.innerHTML = 'Delete';
    delbtn.className = 'btn btn-danger btn-sm';
    delbtn.setAttribute(
        'style', 'padding-y: .25rem; padding-x: .5rem; font-size: .6rem;'
    );
    delbtn.addEventListener('click', function(){
        records.removeChild(delbtn.parentElement);
        localStorage.removeItem(obj.keyForObj);
    });
    list.appendChild(delbtn);
    const editbtn = document.createElement('button');
    editbtn.innerHTML = 'Edit';
    editbtn.className = 'btn btn-danger btn-sm';
    editbtn.setAttribute(
        'style', 'padding-y: .25rem; padding-x: .5rem; font-size: .6rem; margin-left:10px'
    );
    editbtn.addEventListener('click', function(){
    document.getElementById('amount').value = obj.amount;
    document.getElementById('desc').value = obj.desc;
    document.getElementById('category').value = obj.category;
    records.removeChild(delbtn.parentElement);
    localStorage.removeChild(obj.keyForObj);
    });
    list.appendChild(editbtn);

    const records = document.getElementById('records');
    records.appendChild(list);
}