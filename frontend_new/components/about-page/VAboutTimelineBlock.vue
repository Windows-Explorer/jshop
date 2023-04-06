<template>
    <div class="about-timeline-block">
        <h2>Хронология</h2>
        <div class="separator"></div>
        <VTimeline date="2021"
            text="В этом году мы планируем открыть нашу новую кофейню в Урюпинске, чтобы все, кто там живет, могли насладиться настоящим вкусом кофе, теплыми закусками и аппетитными десертами по доступной цене." />
        <VTimeline date="2015"
            text="Наш веб-сайт был значительно обновлен в 2015 году новой информацией, ссылками с медиа-ресурсов, фотографиями, видео и многим другим." />
        <VTimeline date="2013"
            text="В 2013 году мы приняли участие в благотворительной акции, посвященной детям из малообеспеченных семей. Это был бесценный опыт для каждого члена нашей команды." />
        <VTimeline date="2010"
            text="Наша команда была расширена в 2010 году. Мы наняли больше барист и менеджеров по продажам, которые позже стали нашими ведущими сотрудниками в кофейнях и складских отделах." />
        <VTimeline date="2008"
            text="Мы разработали и запустили первую версию нашего веб-сайта, которая включала основную информацию о нас и кофейное меню." />
        <VTimeline date="2006"
            text="Мы расширили наше меню, включив в него не только вкусные и ароматные кофейные напитки, но и другие блюда, закуски и десерты." />
        <VTimeline date="2002" text="Мы открыли наши двери для местных клиентов в 2002 году." />
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

.about-timeline-block {
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