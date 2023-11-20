<script setup>

import { ref } from "vue";

import "@/assets/css/carousel.css"


// img
import welcomePageImg from "@/assets/img/welcome-page.jpg";
import welcomePageImgKorea from "@/assets/img/welcome-wallpaper.svg";


</script>

<template>
    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
    <!-- <div class="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true"
                    aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div> -->
        <div class="carousel-inner">
            <!-- <div class="carousel-item active">
                    <img :src="welcomePageImgKorea" class="d-block w-100" alt="welcomePage">
                    <div class="carousel-caption text-start">
                        <h1>Trip With</h1>
                        <h1>Double JJ!</h1>
                        <p>맛, 문화, 자연 속으로! 한국 여행의 모든 것.</p>
                        <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
                    </div>
                </div> -->
            <div class="carousel-item active">
                <div class="container">
                    <div>
                        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5">
                                    <animate attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite">
                                    </animate>
                                    <stop offset="0%" stop-color="rgba(255, 0, 255, 1)"></stop>
                                    <stop offset="100%" stop-color="rgba(255, 0, 255, 0)"></stop>
                                </radialGradient>
                                <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5">
                                    <animate attributeName="fx" dur="23.5s" values="0%;3%;0%" repeatCount="indefinite">
                                    </animate>
                                    <stop offset="0%" stop-color="rgba(255, 255, 0, 1)"></stop>
                                    <stop offset="100%" stop-color="rgba(255, 255, 0, 0)"></stop>
                                </radialGradient>
                                <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5">
                                    <animate attributeName="fx" dur="21.5s" values="0%;3%;0%" repeatCount="indefinite">
                                    </animate>
                                    <stop offset="0%" stop-color="rgba(0, 255, 255, 1)"></stop>
                                    <stop offset="100%" stop-color="rgba(0, 255, 255, 0)"></stop>
                                </radialGradient>
                                <radialGradient id="Gradient4" cx="50%" cy="50%" fx="4.56417%" fy="50%" r=".5">
                                    <animate attributeName="fx" dur="23s" values="0%;5%;0%" repeatCount="indefinite">
                                    </animate>
                                    <stop offset="0%" stop-color="rgba(0, 255, 0, 1)"></stop>
                                    <stop offset="100%" stop-color="rgba(0, 255, 0, 0)"></stop>
                                </radialGradient>
                                <radialGradient id="Gradient5" cx="50%" cy="50%" fx="2.65405%" fy="50%" r=".5">
                                    <animate attributeName="fx" dur="24.5s" values="0%;5%;0%" repeatCount="indefinite">
                                    </animate>
                                    <stop offset="0%" stop-color="rgba(0,0,255, 1)"></stop>
                                    <stop offset="100%" stop-color="rgba(0,0,255, 0)"></stop>
                                </radialGradient>
                                <radialGradient id="Gradient6" cx="50%" cy="50%" fx="0.981338%" fy="50%" r=".5">
                                    <animate attributeName="fx" dur="25.5s" values="0%;5%;0%" repeatCount="indefinite">
                                    </animate>
                                    <stop offset="0%" stop-color="rgba(255,0,0, 1)"></stop>
                                    <stop offset="100%" stop-color="rgba(255,0,0, 0)"></stop>
                                </radialGradient>
                            </defs>
                            <rect x="13.744%" y="1.18473%" width="100%" height="100%" fill="url(#Gradient1)"
                                transform="rotate(334.41 50 50)">
                                <animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite"></animate>
                                <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite"></animate>
                                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50"
                                    dur="7s" repeatCount="indefinite"></animateTransform>
                            </rect>
                            <rect x="-2.17916%" y="35.4267%" width="100%" height="100%" fill="url(#Gradient2)"
                                transform="rotate(255.072 50 50)">
                                <animate attributeName="x" dur="23s" values="-25%;0%;-25%" repeatCount="indefinite">
                                </animate>
                                <animate attributeName="y" dur="24s" values="0%;50%;0%" repeatCount="indefinite"></animate>
                                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50"
                                    dur="12s" repeatCount="indefinite"></animateTransform>
                            </rect>
                            <rect x="9.00483%" y="14.5733%" width="100%" height="100%" fill="url(#Gradient3)"
                                transform="rotate(139.903 50 50)">
                                <animate attributeName="x" dur="25s" values="0%;25%;0%" repeatCount="indefinite"></animate>
                                <animate attributeName="y" dur="12s" values="0%;25%;0%" repeatCount="indefinite"></animate>
                            <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50"
                                dur="9s" repeatCount="indefinite"></animateTransform>
                        </rect>
                    </svg>
                </div>
                <div class="carousel-caption">
                    <h1>맛, 문화, 자연 속으로!</h1>
                    <h1>한국 여행의 모든 것.</h1>
                    <p></p>
                    <!-- <p>맛, 문화, 자연 속으로! 한국 여행의 모든 것.</p> -->
                        <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p>
                    </div>
            </div>
        </div>
        <!-- <div class="carousel-item">
                <div class="container">
                    <div class="carousel-caption text-end">
                        <h1>Trip With</h1>
                        <h1>Double JJ!</h1>
                            <p>맛, 문화, 자연 속으로! 한국 여행의 모든 것.</p>
                            <p><a class="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
                        </div>
                    </div>
                </div> -->
        </div>
        <!-- <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button> -->
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

h1, p {
    font-family: 'Black Han Sans';
}


h1 {
    font-size: 48px;
}

p {
    font-size: 32px;;
}
</style>