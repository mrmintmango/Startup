import React from 'react';
import './friendsStyle.css'

export function Friends() {
  return (
    <main className="friendmain">
      <div>
        <h3>Check out your friends vaults!</h3>
            <div className='scrollmenu'>
                <button><img src="https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg" /><br/>Bob's Vault</button>
                <button><img src="https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg" /><br/>Bob's Vault</button>
                <button><img src="https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg" /><br/>Bob's Vault</button>
                <button><img src="https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg" /><br/>Bob's Vault</button>
                <button><img src="https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg" /><br/>Bob's Vault</button>
                <button><img src="https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg" /><br/>Bob's Vault</button>
                <button><img src="https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg" /><br/>Bob's Vault</button>
                <button><img src="https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg" /><br/>Bob's Vault</button>
                <button><img src="https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg" /><br/>Bob's Vault</button>
                <button><img src="https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg" /><br/>Bob's Vault</button>
            </div>

            <div>
            <p>add Friend:</p>
            <div class="center"> <input type="search" id="search" name="varSearch" /><button type="button">Add</button></div>
            </div>
      </div>
    </main>
  );
}