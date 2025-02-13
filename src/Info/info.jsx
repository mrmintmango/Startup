import React from 'react';
import './gameInfoStyle.css';

export function Info() {
  return (
    <body>
    <div class="grid-container">
      <div class="item1"><p> Favorite? <input type="checkbox"/> </p></div>
      <div class="item2"><img height={500} alt="gta" src="https://media.gamestop.com/i/gamestop/10161249?$pdp2x$"/></div>
      <div class="item3">
        <p>rating<input type="range" name="varRange" id="range" min="0" max="100" step="1" value="0" />
          <output id="rangeOutput" for="range">0</output>
          <script>
            const range = document.querySelector('#range');
            const rangeOutput = document.querySelector('#rangeOutput');
            range.addEventListener('input', function() {
              rangeOutput.textContent = range.value });
          </script></p>
      </div>
      <div class="item4"><p>Game Time: 20hours 12min </p>
        <label for="textarea">Review: <br/></label>
        <textarea id="textarea" name="varTextarea"></textarea>
      </div>
      <div class="item6">
        <p> Memories: </p>
        <div><input type="file" id="file" name="varFile" accept="image/*" multiple /></div>
        <img height={300} alt="gta" src="https://media.gamestop.com/i/gamestop/10106497_10106499_10115457_10115461_10115462_10161249_10161250_SCR17/Grand-Theft-Auto-V---PlayStation-4?$screen2x$"/>
        <textarea id="textarea" name="varTextarea"></textarea>
      </div>
    </div>

  </body>
  );
}