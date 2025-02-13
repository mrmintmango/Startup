import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">
    <ul class="navigation">
        <li><a href="index.html">Logout</a></li>
        <li><a href="vaultPage.html">Vault</a></li>
        <li class="active"><a href="gameTime.html">GameTime</a></li>
        <li><a href="friends.html">Friends</a></li>
    </ul>       

    <main>App componenets go here</main>

    <footer>
    <div></div>
    <p>created by Ruben Matos</p>
    <a href="https://github.com/mrmintmango/Startup"> my Github! </a>
    </footer>
  </div>;
}