<template>
    <div class="contact-send-block">
        <div class="contact-send-block-container">
            <h2>
                Связаться
            </h2>
            <div class="block-separator separator"></div>
            <p>Вы можете связаться с нами любым удобным для вас способом. Мы доступны 24/7 по факсу или электронной почте.
                Вы также можете воспользоваться краткой формой обратной связи ниже или посетить наш салон лично. Мы были бы
                рады ответить на ваши вопросы.</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h2 {
    font-family: 'Roboto Slab', serif;
    color: $primary;
    margin-bottom: 0px;
    margin-top: 60px;
}

p {
    color: $primary;
    font-family: 'Nunito', serif;
}

.contact-send-block {
    width: 100%;
    background: url("../../assets/images/background-contact_2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}

.contact-send-block-container {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 100px 60px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    gap: 30px;
}
</style>