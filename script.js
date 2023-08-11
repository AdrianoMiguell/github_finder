const divUser = document.querySelector(".div_user");
const divRepos = document.querySelector(".div_repos");
const divInforms = document.querySelector(".informations");
// let msg = document.querySelector(".msg");

const userN = document.querySelector(".name");
const avatar = document.querySelector(".avatar");
const bio = document.querySelector(".bio");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");

const starts = () => {
  event.preventDefault();

  let imgSearch = document.querySelector(".imgSearch");
  if(imgSearch != undefined) {
    imgSearch.parentNode.removeChild(imgSearch);
  }

  Busca();
}

async function Busca() {
  let username = document.getElementById("user").value;

  const response = await fetch(`https://api.github.com/users/${username}`);
  const userData = await response.json();
  const userStatus = await response.status;

  divUser.classList.remove("block");
  divRepos.classList.remove("block");

  console.clear();
  console.log(userData);

  if (userStatus == 404) {
    userN.innerText = "";
    avatar.setAttribute("src", "");
    followers.innerText = "";
    following.innerText = "";
    divRepos.innerHTML = "";
    divInforms.style.justifyContent = "center";
    
    bio.innerText = "Nenhum usuario encontrado!";
  } else {
    showUser(userData);
    showRepos(username);
  }
}

async function showUser(user) {
  userN.innerText = user.name;
  avatar.setAttribute("src", user.avatar_url);
  bio.innerText = user.bio;
  followers.innerText = `Seguidores: ${user.followers}`;
  following.innerText = `Seguindo: ${user.following}`;
}

async function showRepos(user) {
  const response = await fetch(`https://api.github.com/users/${user}/repos`, {
    priority: "low",
  });
  const repos = await response.json();

  const nameRepos = document.querySelector(".nameRepos");
  divRepos.innerHTML = "<h3> Repositorios do usuário </h3>";
  divInforms.style.justifyContent = "space-around";

  let quant = [];

  if (repos.length > 5) {
    for (let r = 0; r < 5; r++) {
      let m = Math.floor(Math.random() * repos.length);
      quant.push(m);
    }
  } else {
    for (let i = 0; i < repos.length; i++) {
      quant.push(i);
    }
  }

  if (quant.length > 0) {
    for (let i = 0; i < quant.length; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "repos");
      divRepos.appendChild(div);

      let divReposI = document.querySelectorAll(".repos");
      let info = document.createElement("div");
      divReposI[i].appendChild(info);
    }

    let divsRepos = document.querySelectorAll(".repos");
    let divsReposI = document.querySelectorAll(".repos div");

    for (let i = 0; i < quant.length; i++) {
      // nome do repositorio
      let h4 = document.createElement("h4");
      h4.setAttribute("class", "nameRepos");
      h4.innerHTML = repos[quant[i]].name;
      divsReposI[i].appendChild(h4);

      // data de criação
      let dateRepos = document.createElement("span");
      dateRepos.setAttribute("class", "dateRepos");
      dateRepos.innerHTML = `Data de criação : ${Intl.DateTimeFormat(
        "pt-br"
      ).format(new Date(repos[quant[i]].created_at))} `;
      divsReposI[i].appendChild(dateRepos);

      divsRepos[i].innerHTML += `<div class="othersInfoRepo"> </div>`;

      let divsOthers = document.querySelectorAll(".othersInfoRepo");

      // url do repositorio
      let url = document.createElement("a");
      url.setAttribute("class", "urlRepos");
      url.setAttribute("href", repos[quant[i]].html_url);
      url.setAttribute("target", "_blank");
      url.innerHTML = repos[quant[i]].html_url;
      divsOthers[i].appendChild(url);

      divsOthers[i].innerHTML += `<div class="info_counts"> 
      <span class="starsRepos"> 
        <abbr title="stars"> <img width="20" height="20" src="./img/icons8-multiple-stars-48.png" alt="multiple-stars"/> ${repos[quant[i]].stargazers_count} </abbr>
      </span>

      <span class="forksRepos"> 
        <abbr title="forks"><img width="20" height="20" src="./img/icons8-arrows-fork-48.png" alt="arrows-fork"/> ${repos[quant[i]].forks_count} </abbr>
      </span>
        
      <span class="viewsRepos"> 
        <abbr title="views"><img width="20" height="20" src="./img/icons8-visualizar-arquivo-64.png" alt="views"/> ${repos[quant[i]].watchers_count} </abbr>
      </span>
        
      </div>`;

    }
  }

  console.log(repos);
}