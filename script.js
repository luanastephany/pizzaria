let modalQt = 1

//Listagem das pizzas
pizzaJson.map((item, index) => {

   //pega tudo que está dentro do item e clona
   let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)

   pizzaItem.setAttribute('data-key', index)

   //nome, descrição, preço e imagem das pizzas do arquivo pizzas.js
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
   pizzaItem.querySelector('.pizza-item--img img').src = item.img
   pizzaItem.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault()

      modalQt = 1

      //Parte do Modal
      document.querySelector('.pizzaInfo h1').innerHTML = item.name
      document.querySelector('.pizzaInfo--desc').innerHTML = item.description
      document.querySelector('.pizzaBig img').src = item.img
      document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`

      document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')
      document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
         if (sizeIndex == 2) {
            size.classList.add('selected')
         }
         size.querySelector('span').innerHTML = item.sizes[sizeIndex]
      })

      //vai 'setar' a quantidade inicial sempre em 1
      document.querySelector('.pizzaInfo--qt').innerHTML = modalQt


      //aparece nova área com a pizza escolhida por causa do flex e transition
      document.querySelector('.pizzaWindowArea').style.opacity = 0
      document.querySelector('.pizzaWindowArea').style.display = 'flex'
      setTimeout(() => {
         document.querySelector('.pizzaWindowArea').style.opacity = 1
      }, 200)
   })

   //o append vê o conteúdo que já existe e add mais um (no caso, add as pizzas)
   document.querySelector('.pizza-area').append(pizzaItem)

})

// Eventos do modal
function closeModal() {
   document.querySelector('.pizzaWindowArea').style.opacity = 0
   setTimeout(() => {
      document.querySelector('.pizzaWindowArea').style.display = 'none'
   }, 500)
}

//botão de voltar a cancelar funcionando
document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
   item.addEventListener('click', closeModal)
})

//diminuindo e aumentando quantidade de pizzas
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
   if (modalQt > 1) {
      modalQt--
      document.querySelector('.pizzaInfo--qt').innerHTML = modalQt
   }
})

document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
   modalQt++
   document.querySelector('.pizzaInfo--qt').innerHTML = modalQt
})

//selecionar entre tamanhos P, M e G
document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
   size.addEventListener('click', (e) => {
      document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')
      size.classList.add('selected')
   })
})