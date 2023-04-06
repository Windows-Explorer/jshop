<template>
    <div class="about-story-block">
        <h2>Несколько слов о нас</h2>
        <div class="separator"></div>
        <p>Мы рады представить производство кофе в зернах и приглашаем вас насладиться уникальной дружеской атмосферой в
            нашей кофейне. Если вы любите вкусный кофе, вам понравится знать, что мы предлагаем реальную альтернативу сетям,
            предлагающим кофе ручной работы и эспрессо-напитки.</p>
        <VQuote text="Компания Beans была основана в 2002 году как мощная альтернатива местным кофейням и магазинам, позволяющая
                    покупать, обжаривать и молоть любой сорт кофе." />
    </div>
</template>

<style lang="scss" scoped>
h2 {
    margin: 20px;
    font-family: 'Roboto Slab', serif;
    font-size: xx-large;
    color: $dark;
}

p {
    width: 50%;
    font-family: 'Nunito', serif;
    color: $dark;
}

.separator {
    background-color: $accent;
}

.about-story-block {
    width: 100%;
    background-color: $primary;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

@media screen and (max-width: 600px) {
    h2 {
        font-size: x-large;
    }

    p {
        width: 80%;
    }
}
</style>