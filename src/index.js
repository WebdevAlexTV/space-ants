import loadAudio from "./audio";
import k from "./kaboom";

import start from "./scenes/start";
import game from "./scenes/game";
import title from "./scenes/title";
import controls from "./scenes/controls";
import about from "./scenes/about";
import introduction from "./scenes/introduction";
import success from "./scenes/success";
import gameOver from "./scenes/gameOver";

import loadSprites from "./sprites";

loadSprites();
loadAudio();

k.scene("start", start);
k.scene("title", title);
k.scene("game", game);
k.scene("controls", controls);
k.scene("about", about);
k.scene("introduction", introduction);
k.scene("success", success);
k.scene("gameOver", gameOver);

k.go("start");
