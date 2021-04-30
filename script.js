let modalQt = 1 //qtd de itens
let cart = [] //carrinho
let modalKey = 0

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
      modalKey = e.target.closest('.pizza-item').getAttribute('data-key')

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

//adicionando ao carrinho
document.querySelector('.pizzaInfo--addButton').addEventListener('click', () => {
   let size = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key')
   let identifier = pizzaJson[modalKey].id + '@' + size
   let key = cart.findIndex((item) => {
      return item.identifier == identifier
   })

   if (key > -1) {
      cart[key].qt += modalQt
   } else {
      cart.push({
         identifier: identifier,
         id: pizzaJson[modalKey].id, //qual a pizza?
         size: size,  //qual o tamanho?
         qt: modalQt //quantas pizzas?
      })
   }
   updateCart()
   closeModal()
})

document.querySelector('.menu-openner').addEventListener('click', () => {
   if (cart.length > 0) {
      document.querySelector('aside').style.left = '0'
   }
})

document.querySelector('.menu-closer').addEventListener('click', () => {
   document.querySelector('aside').style.left = '100vh'
})


//mostrando o carrinho com os itens adicionados
function updateCart() {
   document.querySelector('.menu-openner span').innerHTML = cart.length

   if (cart.length > 0) {
      document.querySelector('aside').classList.add('show')
      document.querySelector('.cart').innerHTML = ''


      let subtotal = 0
      let desconto = 0
      let total = 0


      for (let i in cart) {
         let pizzaItem = pizzaJson.find((item) => {
            return item.id == cart[i].id
         })

         subtotal += pizzaItem.price * cart[i].qt

         let cartItem = document.querySelector('.models .cart--item').cloneNode(true)

         let pizzaSizeName

         console.log('alguma', cart[i])

         switch (Number(cart[i].size)) {
            case 0:
               pizzaSizeName = 'P'
               break
            case 1:
               pizzaSizeName = 'M'
               break
            case 2:
               pizzaSizeName = 'G'
               break
         }
         let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

         //imagem, nome e qtd de pizzas no carrinho
         cartItem.querySelector('img').src = pizzaItem.img
         cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
         cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
         cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
            if (cart[i].qt > 1) {
               cart[i].qt--
            } else {
               cart.splice(i, 1)
            }
            updateCart()
         })

         cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
            cart[i].qt++
            updateCart()
         })

         document.querySelector('.cart').append(cartItem)
      }

      desconto = subtotal * 0.1
      total = subtotal - desconto

      document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
      document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
      document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

   } else {
      document.querySelector('aside').classList.remove('show')
      document.querySelector('aside').style.left = '100vh'
   }
}

