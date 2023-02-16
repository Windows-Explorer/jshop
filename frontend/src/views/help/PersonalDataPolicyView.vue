<template>
    <section class="container">
        <section class="content">
            <h4 class="title">Общая информация о персональных данных и правовые основания</h4>
            <div class="text">
                <p>Конфиденциальность и безопасность данных клиентов, а также посетителей сайта {{ siteName }} чрезвычайно важны для нас, и мы бережно относимся к оказанному нам доверию.</p>
                <p>Обработка персональных данных в {{ siteName }} производится на основании:</p>
                <ul>
                    <li>Федерального закона №152 «О персональных данных». В соответствии с положением ст. 6 указанного закона, обработка персональных данных возможна, если она «необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем»;</li>
                    <li>Общего Регламента по защите персональных данных (Европейский Союз);</li>
                    <li>и других нормативно-правовых актов, применимых к процедуре обработки персональных данных регистратором доменных имён.</li>
                </ul>
            </div>
        </section>
    </section>
</template>

<script lang="ts" setup>import { defaultTitle } from '../../router'

const siteName: string = defaultTitle.toUpperCase()
</script>

<style lang="scss" scoped>
.container {
    padding: 0px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    .content {
        width: 50%;
        p {
            font-size: larger;
        }
        li {
            margin-top: 16px;
            list-style-type: none;
            font-size: larger;
        }
        li:before {
            content: "—";
            position: relative;
            left: -5px;
        }
    }
}
</style>