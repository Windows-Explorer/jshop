<template>
    <div class="cart-page-wrapper">
        <Breadcrumb pageTitle="Корзина" />

        <div class="cart-main-area pt-90 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-12" v-if="products.length > 0">
                        <h3 class="cart-page-title">Ваша корзина товаров</h3>
                        <div class="table-content table-responsive cart-table-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Изображение</th>
                                        <th>Имя товара</th>
                                        <th>Стоимость</th>
                                        <th>Кол-во</th>
                                        <th>Общая стоимость</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in products" :key="index">
                                        <td class="product-thumbnail">
                                            <n-link :to="`/product/${slugify(product.title)}`">
                                                <img :src="product.images[0]" :alt="product.title">
                                            </n-link>
                                        </td>
                                        <td class="product-name">
                                            <n-link :to="`/product/${slugify(product.title)}`">{{ product.title }}</n-link>
                                        </td>
                                        <td class="product-price-cart">
                                            <span class="amount">${{ discountedPrice(product).toFixed(2) }}</span>
                                            <del class="old">${{ product.price.toFixed(2) }}</del>
                                        </td>
                                        <td class="product-quantity">
                                            <div class="cart-plus-minus">
                                                <button @click="decrementProduct(product)" class="dec qtybutton">-</button>
                                                <input class="cart-plus-minus-box" type="text" :value="product.cartQuantity" readonly>
                                                <button @click="incrementProduct(product)" class="inc qtybutton">+</button>
                                            </div>
                                        </td>
                                        <td class="product-subtotal">${{ product.total.toFixed(2) }}</td>
                                        <td class="product-remove">
                                            <button @click="removeProduct(product)"><i class="fa fa-times"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="cart-shiping-update-wrapper">
                                    <div class="cart-shiping-update">
                                        <n-link to="/shop">Продолжить покупки</n-link>
                                    </div>
                                    <div class="cart-clear">
                                        <button @click="clearCart()">Очистить корзину</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-md-6">
                                <div class="cart-tax">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gray">Оценить стоимость доставки</h4>
                                    </div>
                                    <div class="tax-wrapper">
                                        <p>Введите пункт назначения, чтобы получить оценку доставки.</p>
                                        <div class="tax-select-wrapper">
                                            <div class="tax-select">
                                                <label>
                                                    * Страна
                                                </label>
                                                <select class="email s-email s-wid">
                                                    <option>Bangladesh</option>
                                                    <option>Albania</option>
                                                    <option>Aland Islands</option>
                                                    <option>Afghanistan</option>
                                                    <option>Belgium</option>
                                                </select>
                                            </div>
                                            <div class="tax-select">
                                                <label>
                                                    * Почтовый индекс
                                                </label>
                                                <input type="text">
                                            </div>
                                            <button class="cart-btn-2" type="submit">Рассчитать</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="discount-code-wrapper">
                                    <div class="title-wrap">
                                    <h4 class="cart-bottom-title section-bg-gray">Промокод</h4> 
                                    </div>
                                    <div class="discount-code">
                                        <p>Введите промокод, если он у вас есть.</p>
                                        <form>
                                            <input type="text" required="" name="name">
                                            <button class="cart-btn-2" type="submit">Применить промокод</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="grand-total">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gary-cart">Итого</h4>
                                    </div>
                                    <h5>Продуктов<span>${{ total.toFixed(2) }}</span></h5>
                                    <h4 class="grand-total-title">Всего<span>${{ total.toFixed(2) }}</span></h4>
                                    <n-link to="/checkout">Оформить заказ</n-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" v-else>
                        <div class="empty-cart text-center">
                            <div class="icon">
                                <i class="pe-7s-cart"></i>
                            </div>
                            <h4>Пусто</h4>
                            <n-link to="/shop" class="empty-cart__button">В магазин</n-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                singleQuantity: 1
            }
        },

        computed: {
            products() {
                return this.$store.getters.getCart
            },

            total() {
                return this.$store.getters.getTotal
            },
        },

        methods: {
            incrementProduct(product) {
                const prod = { ...product, cartQuantity: 1 }
                if (product.cartQuantity < product.quantity) {
                    this.$store.dispatch('addToCartItem', prod)
                }
            },

            decrementProduct(product) {
                const prod = { ...product, cartQuantity: 1 }
                if (product.cartQuantity > 1) {
                    this.$store.dispatch('decreaseProduct', prod)
                }
            },

            removeProduct(product) {
                // for notification
                this.$notify({ title: 'Item remove from cart!'})

                this.$store.dispatch('removeProductFromCart', product)
            },

            discountedPrice(product) {
                return product.price - (product.price * product.discount / 100)
            },

            clearCart() {
                if (confirm("Are you sure you want to clear cart")) {
                    // for notification
                    this.$notify({ title: 'Item remove from cart!'})
                    
                    this.$store.commit('CLEAR_CART')
                }
            },

            slugify(text) {
                return text
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Replace spaces with -
                    .replace(/[^\w-]+/g, "") // Remove all non-word chars
                    .replace(/--+/g, "-") // Replace multiple - with single -
                    .replace(/^-+/, "") // Trim - from start of text
                    .replace(/-+$/, ""); // Trim - from end of text
            }
        },

        head() {
            return {
                title: "Cart"
            }
        },
    };
</script>
