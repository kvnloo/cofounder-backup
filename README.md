
![cofounder-og-black](https://github.com/user-attachments/assets/b4e51f02-59e4-4540-ac14-e1f40e20a658)

# Cofounder | Early alpha release

* project - [cofounder.openinterface.ai](https://cofounder.openinterface.ai)
* 👋 [@n_raidenai](https://x.com/n_raidenai)

**cofounder**
- full stack generative web apps ; backend + db + stateful web apps
- gen ui rooted in app architecture, with ai-guided mockup designer & modular design systems

---

# Early Alpha : Unstable ⚠️

The following points are very emphasized :

- This is an **EARLY, UNSTABLE, PREVIEW RELEASE** of the project. ⚠️ Until v1 is released, it is expected to break often. 
- **It consumes a lot of tokens**. If you are on a tokens budget, wait until v1 is released.
- Again, this is an early, unstable release. A first test run. An early preview of the project's ideas. Far from completion. Open-source iterative development. Work in progress. Unstable early alpha release. [etc]

### **If any of these might be issues for you, even in the slightest way, wait until v1 is released ! Do not try the current release !**

To help you guide your decision on whether or not to try the current release , here is a guide

| Situation                                                                                             | Recommendation         |
|------------------------------------------------------------------------------------------------------|------------------------|
| I'm not sure if this tool release is mature yet, maybe it will not work as intended and I may spend millions of tokens for nothing | Do not use it yet      |
| I am very excited about this tool, I hope it is perfectly production-ready, because if it's not, I will make commentary about `I spent X amount on OpenAI API calls` | Do not use it yet      |
| I am not interested in code. I want to type words into a box and have my project completed; I do not want messy broken unfinished code | Do not use it yet      |
| I love exploring experimental tools but I am on the fence. It's going to break halfway and leave me sad | Do not use it yet      |
| Who should even try it at this point?                                                                | Nobody. Do not use it yet |
| But I really want to use it for some esoteric reason having read all the above.                       | Do not use it yet either |


---


https://github.com/user-attachments/assets/cfd09250-d21e-49fc-a29b-fa0c661abfc0

https://github.com/user-attachments/assets/c055f9c4-6bc0-4b11-ba8f-cc9f149387fa

---

## Important

**Early alpha release ; earlier than expected by few weeks**

Still not merged with key target features of the project, notably :
- project iteration modules for all dimensions of generated projects
- admin interface for event streams and (deeper) project iterations
- integrate the full genUI plugin :
  * generative design systems
  * deploy finetuned models & serve from api.cofounder
- local, browser-based dev env for the entire project scope
- add { react-native , flutter , other web frameworks }
- validations & swarm code review and autofix
- code optimization
- [...]

be patient :)

---

# Usage

## Install & Init

* Open your terminal and run

```sh
npx @openinterface/cofounder
```

Follow the instructions. The installer 
- will ask you for your keys
- setup dirs & start installs
- will start the local `cofounder/api` builder and server
- will open the web dashboard where you can create new projects (at `http://localhost:4200` ) 🎉

```
note :
you will be asked for a cofounder.openinterface.ai key
it is recommended to use one as it enables the designer/layoutv1 and swarm/external-apis features
and can be used without limits during the current early alpha period

the full index will be available for local download on v1 release
```

- currently using `node v22` for the whole project. 



```sh
# alternatively, you can make a new project without going through the dashboard
# by runing :
npx @openinterface/cofounder -p "YourAppProjectName" -d "describe your app here" -a "(optional) design instructions"
```


## Run Generated Apps

- Your backend & vite+react web app will incrementally generate inside `./apps/{YourApp}`
Open your terminal in `./apps/{YourApp}` and run

```sh
npm i && npm run dev
```

It will start both the backend and vite+react, concurrently, after installing their dependencies
Go to `http://localhost:5173/` to open the web app 🎉


- From within the generated apps , you can use ⌘+K / Ctrl+K to iterate on UI components

[more details later]

## Notes

### Dashboard & Local API

If you resume later and would like to iterate on your generated apps,
the local `./cofounder/api` server needs to be running to receive queries

You can (re)start the `local cofounder API` running the following command from `./cofounder/api`

```sh
npm run start
```

The dashboard will open in `http://localhost:4200`


- note: You can also generate new apps from the same env, without the the dashboard, by running, from `./cofounder/api`, one of these commands
    
    ```sh
    npm run start -- -p "ProjectName" -f "some app description" -a "minimalist and spacious , light theme"
    npm run start -- -p "ProjectName" -f "./example_description.txt" -a "minimalist and spacious , light theme"
    ```

### Concurrency

**[the architecture will be further detailed and documented later]**

Every "node" in the `cofounder` architecture has a defined configuration under `./cofounder/api/system/structure/nodes/{category}/{name}.yaml` to handle things like concurrency, retries and limits per time interval

For example, if you want multiple LLM generations to run in parallel (when possible - sequences and parallels are defined in DAGS under `./cofounder/api/system/structure/sequences/{definition}.yaml` ),
go to

```yaml
#./cofounder/api/system/structure/nodes/op/llm.yaml
nodes:
 op:LLM::GEN:
  desc: "..."
  in: [model, messages, preparser, parser, query, stream]
  out: [generated, usage]
  queue:
   concurrency: 1 # <------------------------------- here 
 op:LLM::VECTORIZE:
  desc: "{texts} -> {vectors}"
  in: [texts]
  out: [vectors, usage]
 mapreduce: true
 op:LLM::VECTORIZE:CHUNK:
  desc: "{texts} -> {vectors}"
  in: [texts]
  out: [vectors, usage]
  queue:
   concurrency: 50
```

and change the `op:LLM::GEN` parameter `concurrency` to a higher value

The default LLM concurrency is set to `2` so you can see what's happening in your console streams step by step - but you can increment it depending on your api keys limits

---

# Changelog

---

# Roadmap

---

# Benchmarks

---

# Community & Links

- [![Cofounder](https://img.shields.io/badge/Cofounder-gray?style=for-the-badge&logo=discord&link=https://discord.gg/2kVMzeASj9)](https://discord.gg/2kVMzeASj9) | Community discord server by @flamecoders

---

# Docs, Design Systems, ...

**[WIP]**

---

# Architecture

[more details later]

archi/v1 is as follows :

![architecture](https://github.com/user-attachments/assets/b2d8b70e-7a6d-45c9-a706-0cf955d13451)


---

# Credits

- Demo design systems built using Figma renders / UI kits from:
  * blocks.pm by Hexa Plugin (see `cofounder/api/system/presets`)
  * google material
  * figma core
  * shadcn
- Dashboard node-based ui powered by [react flow](https://reactflow.dev/)


## 🌐 Web Resources & Verified Articles Directory
- [BUBBLE SHOOTER WITCH TOWER](https://unblocked-galaxy.web.app/bubble-shooter-witch-tower.html)
- [ROOFTOP RUN](https://zona-igr-besplatno.web.app/rooftop-run.html)
- [SORTING XMAS BALLS](https://hindigames-hub.netlify.app/sorting-xmas-balls.html)
- [CANDY JEWELS](https://speed-racing-arcade.pages.dev/candy-jewels.html)
- [STICK BOY BAZOOKA RAGDOLL](https://koreagame-hub24.netlify.app/stick-boy-bazooka-ragdoll.html)
- [GRANNY HALLOWEEN HOUSE](https://nihongames-portal.netlify.app/granny-halloween-house.html)
- [CLIMB UP](https://juegosmundial-hoy.pages.dev/climb-up.html)
- [BIG BLOCK BLAST](https://jeuxweb-france.netlify.app/big-block-blast.html)
- [HEXA SORT MASTER](https://gemu-hiroba-japan.web.app/hexa-sort-master.html)
- [SCALA 40](https://youxiweb-hub.netlify.app/scala-40.html)
- [BIKE STUNT RACING LEGEND](https://luchshie-igry-rus.pages.dev/bike-stunt-racing-legend.html)
- [HUGGY WUGGY GUESS THE RIGHT DOOR](https://onlinerus-portal.netlify.app/huggy-wuggy-guess-the-right-door.html)
- [LAST DAY ON EARTH SURVIVAL](https://nihongames-web.github.io/last-day-on-earth-survival.html)
- [MAGIC PRINTER](https://pixelarcade-speed.web.app/magic-printer.html)
- [ATOMIC MERGE 2048](https://zona-juegos-flash.web.app/atomic-merge-2048.html)
- [SHOOT N CRUSH](https://nihongames-portal.netlify.app/shoot-n-crush.html)
- [SCREAMALS](https://pixelarcadezgame.web.app/screamals.html)
- [BIG HEAD](https://hindigame-arena.vercel.app/big-head.html)
- [CHICKEN WARS MERGE GUNS](https://unblocked-action-arena.netlify.app/chicken-wars-merge-guns.html)
- [ZOMBIE SURVIVAL SHOOTER](https://jogosonline-brasil.vercel.app/zombie-survival-shooter.html)
- [GRAND CLASH ARENA](https://bharat-game-zone.web.app/grand-clash-arena.html)
- [MAGMA](https://fruit-calculator-2026.netlify.app/values/magma)
- [PARKING MASTER URBAN CHALLENGES](https://muryo-gemu-tengoku.pages.dev/parking-master-urban-challenges.html)
- [PUSH THE COLORS](https://speed-racing-hub.netlify.app/push-the-colors.html)
- [WOOD BLOCKS JAM](https://planetejeux-france.pages.dev/wood-blocks-jam.html)
- [SQUAD ASSEMBLER](https://sieuthigame-viet.pages.dev/squad-assembler.html)
- [SWEET MERGE](https://nihongames-portal.netlify.app/sweet-merge.html)
- [DINO SLIDE](https://francejeux-online.web.app/dino-slide.html)
- [KEY QUEST](https://youxiweb-hub.netlify.app/key-quest.html)
- [K POP PUZZLE HUNTERS](https://youxiweb-china.github.io/k-pop-puzzle-hunters.html)
- [GUN SHOOTING GAMES SNIPER 3D](https://seoul-game-hub.pages.dev/gun-shooting-games-sniper-3d.html)
- [RICKROLL](https://instantsounds-daw.pages.dev/sound/rickroll.html)
- [ULTIMATE TRANSPORT DRIVING SIM](https://action-strike-zone.pages.dev/ultimate-transport-driving-sim.html)
- [GEOMETRY VIBES X BALL](https://youxiweb-hub.netlify.app/geometry-vibes-x-ball.html)
- [MERGE BLOCKS 2048](https://juegosgratis-es.netlify.app/merge-blocks-2048.html)
- [GLAMOUR BEACHLIFE](https://logic-puzzle-world.pages.dev/glamour-beachlife.html)
- [BOMBAMAN 3D](https://vuagamemienphi24h.pages.dev/bombaman-3d.html)
- [SNEAKER ART](https://kuaile-youxi-hub.web.app/sneaker-art.html)
- [21A](https://arcadegames-france24.web.app/21a.html)
- [DAYCARE TYCOON](https://koreagame-webhub.github.io/daycare-tycoon.html)
