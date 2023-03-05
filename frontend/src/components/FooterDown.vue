<template>
    <section class="footer">
        <div id="delivery-and-payment">
            <h4>Доставка и оплата</h4>
            <router-link :to="{ name: 'home'}">Способы оплаты</router-link>
            <router-link :to="{ name: 'home'}">Службы доставки</router-link>
            <router-link :to="{ name: 'home'}">Адреса магазинов</router-link>
        </div>
        <div id="for-cunsumer">
            <h4>Для покупателей</h4>
            <router-link :to="{ name: 'home'}">Подобрать игру</router-link>
            <router-link :to="{ name: 'home'}">Бонусная программа</router-link>
            <router-link :to="{ name: 'home'}">Информация о заказе</router-link>
            <router-link :to="{ name: 'home'}">Возврат товара</router-link>
            <router-link :to="{ name: 'home'}">Помощь с правилами</router-link>
            <router-link :to="{ name: 'home'}">Юридическим лицам</router-link>
        </div>
        <div id="about-us">
            <h4>О нас</h4>
            <router-link :to="{ name: 'home'}">О магазине</router-link>
            <router-link :to="{ name: 'home'}">Работа у нас</router-link>
            <router-link :to="{ name: 'home'}">Новости</router-link>
            <router-link :to="{ name: 'home'}">Контакты</router-link>
        </div>
    </section>
</template>

<style lang="scss">
    .footer {
        display: flex;
        width: 100vw;
        background-color: #dadada;
        bottom: 0;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: flex-start;
        padding: 20px;
        gap: 10%;
        div {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            align-content: center;
            justify-content: center;
            align-items: flex-start;
            gap: 6px;
            a {
                text-decoration: none;
                color: $primary;
                font-size: medium;
            }
            h4 {
                margin-block: 10px;
                margin-inline: 0;
                font-size: 24px;
            }
        }
    }
</style>