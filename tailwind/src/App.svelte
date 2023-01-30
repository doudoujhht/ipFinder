<script defer>
    import {onMount, SvelteComponent} from "svelte";
    import axios from 'axios';
    import L from "leaflet"

    let map;
    let valeur;
    let result = {
        ip:"",
        location:"",
        timezone:"",
        isp:""

    }
    let isValid = true;
    let icon = L.icon(
        {
            iconUrl: './assets/icon-location.svg',
            iconSize:     [46, 56], // size of the icon
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        }
    )
    onMount(()=>{
        map = L.map('map').setView([45.49452, -73.82419], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([45.49452, -73.82419], {icon:icon}).addTo(map)
    })

    const handleClick = async() =>{
        isValid = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(valeur);
        if(isValid){
            const resultat = await axios.get(`http://localhost:3000/ip/${valeur}`)
            console.log(resultat);
        }
    }

</script>

<div>
    <div class="hero">
        <h1>IP Address Tracker</h1>
        <div class="search">
            <input type="text" placeholder="Search for any IP address or domain" bind:value={valeur}>
            <button class="bg-black" on:click={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>
            </button>
        </div>
    </div>
    <div class="infos">
        <div>
            <h2>IP Address</h2>
            <h1>192.212.174.101</h1>
        </div>
        <hr>
        <div>
            <h2>IP Address</h2>
            <h1>Brooklyn, NY 10001</h1>
        </div>
        <hr>
        <div>
            <h2>IP Address</h2>
            <h1>UTC -05:00</h1>
        </div>
        <hr>
        <div>
            <h2>IP Address</h2>
            <h1>SpaceX Starlink</h1>
        </div>
    </div>

    <div id="map"></div>
</div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.css"
      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      crossorigin=""/>
    
      {#if !isValid}
        <style>
            .search::after{
                content: "the address Ip is Invalid";
                color: red;
                font-size: 1.2rem;
                position: absolute;
                bottom: -20px;
                width: 100%;
                text-align: center;
            }
        </style>
      {/if}
<style>
    .hero{
        background-image: url("../assets/pattern-bg.png");
        background-size: cover;
        height: 280px;
        width: 100vw;
        display: flex;
        gap: 31px;
        padding-top: 33px;
        flex-direction: column;
        align-items: center;
    }
    .hero h1{
        color: white;
    }
    input{
        width: 500px;
        height: 48px;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        color: rgba(44, 44, 44, 0.5);
        mix-blend-mode: normal;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        border: 0;
        padding-left: 24px;
    }
    input:focus, input:focus-visible, input:focus-within,input:focus + button, input:focus-visible + button, input:focus-within + button{
        outline: none;
        border:1px solid rgba(81, 203, 238, 1);
        box-shadow:0 0 5px rgba(81, 203, 238, 1);
        border-right: 0;
    }
    input:focus + button, input:focus-visible + button, input:focus-within + button{
        border-left: 0;
    }
    button{
        background-color: black;
        width: 48px;
        height: 48px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
    }
    .search{
        display: flex;
        height: 58px;
        position: relative;
    }
    .infos{
        display: flex;
        position: absolute;
        z-index: 30;
        width: 1110px;
        height: 161px;
        margin-left: calc((100vw - 1110px) / 2);
        background: #FFFFFF;
        box-shadow: 0 50px 50px -25px rgba(0, 0, 0, 0.0983665);
        border-radius: 15px;
        transform: translateY(-80.5px);
    }
    .infos div{
        width: 213px;
        display: flex;
        flex-direction: column;
        gap: 13px;
    }
    .infos hr{
        height: 75px;
        margin: auto;
    }
    .infos h2{
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 1.75px;
        text-transform: uppercase;
        color: #2C2C2C;
        opacity: 0.5;
    }
    .infos div h1{
        font-style: normal;
        font-weight: 500;
        font-size: 26px;
        line-height: 30px;
        letter-spacing: -0.232143px;
        color: #2C2C2C;
    }
    .infos div{
        margin-top: 37px;
        margin-left: 32px;
    }
    #map{
        z-index: 0;
        height: calc(100vh - 280px);
    }
</style>