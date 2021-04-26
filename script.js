/*const create = (element) => {
    return document.querySelector(element)
}
*/

pizzaJson.map((item, index) => {

    //pega tudo que está dentro do item
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)



    //nome, descrição, preço e imagem das pizzas do arquivo pizzas.js
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()

        //aparece nova área com a pizza escolhida por causa do flex
        document.querySelector('.pizzaWindowArea').style.display = 'flex'
    })

    //o append vê o conteúdo que já existe e add mais um (no caso, add as pizzas)
    document.querySelector('.pizza-area').append(pizzaItem)




})