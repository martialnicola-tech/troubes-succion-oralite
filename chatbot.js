(function () {
  /* ─── BASE DE CONNAISSANCES FAQ ─── */
  const FAQ = [
    {
      id: "frein-langue",
      question: "C'est quoi un frein de langue ?",
      answer: "Le frein lingual est un petit ligament sous la langue qui la relie au plancher de la bouche. Lorsqu'il est trop court ou trop rigide, il peut limiter les mouvements de la langue et causer des troubles de la succion, de l'allaitement ou de l'alimentation.",
      lien: { texte: "En savoir plus →", url: "frein-langue.html" }
    },
    {
      id: "couper",
      question: "Faut-il couper le frein ?",
      answer: "Pas forcément ! Ce n'est pas l'aspect du frein qui décide, c'est la <strong>fonction de la langue</strong>. La section (frénectomie) n'est proposée que si le frein est réellement restrictif ET que la fonction est perturbée ET que les autres causes ont été écartées.",
      lien: { texte: "Voir notre approche →", url: "on-coupe-ou-pas.html" }
    },
    {
      id: "frenectomie",
      question: "C'est quoi une frénectomie ?",
      answer: "La frénectomie est une petite intervention qui consiste à sectionner le frein lingual. Elle est réalisée rapidement, souvent sans anesthésie chez le nourrisson, et doit être suivie d'exercices de rééducation pour être efficace.",
      lien: { texte: "En savoir plus →", url: "frenectomie.html" }
    },
    {
      id: "signes",
      question: "Quels sont les signes d'un frein restrictif ?",
      answer: "Les signes fréquents chez le nourrisson :\n• Difficulté à s'accrocher au sein ou au biberon\n• Douleurs à l'allaitement pour la maman\n• Prise de poids insuffisante\n• Bébé qui se fatigue vite en tétant\n• Claquements ou bruits lors de la tétée\n• Reflux ou coliques fréquentes",
      lien: { texte: "Voir les troubles →", url: "troubles.html" }
    },
    {
      id: "osteo",
      question: "Quel est le rôle de l'ostéopathie ?",
      answer: "L'ostéopathie joue un rôle complémentaire essentiel. Les tensions crâniennes, cervicales ou posturales peuvent aggraver les troubles de succion. Un suivi ostéopathique avant et après une frénectomie améliore significativement les résultats.",
      lien: { texte: "Notre approche →", url: "on-coupe-ou-pas.html" }
    },
    {
      id: "troubles",
      question: "Quels troubles peut causer un frein restrictif ?",
      answer: "Un frein restrictif peut entraîner :\n• Des difficultés d'allaitement\n• Des troubles de déglutition\n• Des problèmes de parole plus tard\n• Des difficultés à manger certains aliments\n• Des tensions posturales",
      lien: { texte: "Voir tous les troubles →", url: "troubles.html" }
    },
    {
      id: "pro",
      question: "Comment trouver un professionnel ?",
      answer: "Notre annuaire liste des professionnels de santé formés à l'évaluation et au traitement des troubles de succion et du frein lingual en Suisse romande : logopédistes, ostéopathes, consultantes en lactation, pédiatres.",
      lien: { texte: "Voir l'annuaire →", url: "trouver-un-professionnel.html" }
    },
    {
      id: "contact",
      question: "Comment nous contacter ?",
      answer: "Vous pouvez nous contacter via le formulaire de contact sur le site. Nous répondons généralement sous 48h.",
      lien: { texte: "Nous contacter →", url: "contact.html" }
    }
  ];

  /* ─── RECHERCHE PAR MOT-CLÉ ─── */
  const keywords = {
    "frein": ["frein-langue", "couper", "frenectomie", "signes"],
    "langue": ["frein-langue", "signes"],
    "couper": ["couper", "frenectomie"],
    "section": ["couper", "frenectomie"],
    "frénectomie": ["frenectomie"],
    "frenectomie": ["frenectomie"],
    "signe": ["signes"],
    "symptôme": ["signes"],
    "allaitement": ["signes", "frein-langue"],
    "sein": ["signes", "frein-langue"],
    "bébé": ["signes", "frein-langue"],
    "ostéo": ["osteo"],
    "osteopathie": ["osteo"],
    "ostéopathie": ["osteo"],
    "trouble": ["troubles"],
    "professionnel": ["pro"],
    "annuaire": ["pro"],
    "contact": ["contact"],
    "douleur": ["signes"],
    "tétée": ["signes", "frein-langue"],
    "déglutition": ["troubles"],
    "parole": ["troubles"],
  };

  function searchFAQ(query) {
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let ids = new Set();
    for (const [kw, kwIds] of Object.entries(keywords)) {
      const kwNorm = kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (q.includes(kwNorm)) kwIds.forEach(id => ids.add(id));
    }
    return FAQ.filter(f => ids.has(f.id));
  }

  /* ─── CONSTRUCTION DU HTML ─── */
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "chatbot.css";
  document.head.appendChild(css);

  document.body.insertAdjacentHTML("beforeend", `
    <button id="chatbot-toggle" aria-label="Ouvrir le chat">
      <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
      <span class="badge">?</span>
    </button>
    <div id="chatbot-window" role="dialog" aria-label="Assistant FAQ">
      <div id="chatbot-header">
        <div class="avatar">💬</div>
        <div class="info">
          <strong>Assistant FAQ</strong>
          <span>Réponses sur les freins & succion</span>
        </div>
        <button id="chatbot-close" aria-label="Fermer">×</button>
      </div>
      <div id="chatbot-messages"></div>
      <div id="chatbot-input-area">
        <input id="chatbot-input" type="text" placeholder="Posez votre question…" autocomplete="off" />
        <button id="chatbot-send" aria-label="Envoyer">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `);

  /* ─── RÉFÉRENCES DOM ─── */
  const toggle   = document.getElementById("chatbot-toggle");
  const win      = document.getElementById("chatbot-window");
  const closeBtn = document.getElementById("chatbot-close");
  const messages = document.getElementById("chatbot-messages");
  const input    = document.getElementById("chatbot-input");
  const sendBtn  = document.getElementById("chatbot-send");
  const badge    = toggle.querySelector(".badge");

  /* ─── AFFICHAGE MESSAGES ─── */
  function addMessage(html, type) {
    const div = document.createElement("div");
    div.className = "cb-msg " + type;
    div.innerHTML = html.replace(/\n/g, "<br>");
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function showSuggestions(items) {
    const wrap = document.createElement("div");
    wrap.className = "cb-suggestions";
    items.forEach(faq => {
      const btn = document.createElement("button");
      btn.className = "cb-suggestion-btn";
      btn.textContent = faq.question;
      btn.addEventListener("click", () => showAnswer(faq));
      wrap.appendChild(btn);
    });
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function showAnswer(faq) {
    addMessage(faq.question, "user");
    let html = faq.answer;
    if (faq.lien) html += `<br><a href="${faq.lien.url}" style="color:#2c8f8f;font-weight:600;">${faq.lien.texte}</a>`;
    addMessage(html, "bot");

    const back = document.createElement("button");
    back.className = "cb-back-btn";
    back.textContent = "← Autres questions";
    back.addEventListener("click", showAllSuggestions);
    messages.appendChild(back);
    messages.scrollTop = messages.scrollHeight;
  }

  function showAllSuggestions() {
    addMessage("Bien sûr ! Voici ce que je peux vous expliquer :", "bot");
    showSuggestions(FAQ);
  }

  /* ─── ACCUEIL ─── */
  function showWelcome() {
    messages.innerHTML = "";
    addMessage("👋 Bonjour ! Je suis l'assistant FAQ de ce site.<br>Sur quoi puis-je vous renseigner ?", "bot");
    showSuggestions(FAQ);
  }

  /* ─── ENVOI TEXTE LIBRE ─── */
  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";

    const results = searchFAQ(text);
    addMessage(text, "user");

    if (results.length === 0) {
      addMessage("Je n'ai pas trouvé de réponse précise à cette question. Voici les sujets que je connais :", "bot");
      showSuggestions(FAQ);
    } else if (results.length === 1) {
      let html = results[0].answer;
      if (results[0].lien) html += `<br><a href="${results[0].lien.url}" style="color:#2c8f8f;font-weight:600;">${results[0].lien.texte}</a>`;
      addMessage(html, "bot");
      const back = document.createElement("button");
      back.className = "cb-back-btn";
      back.textContent = "← Autres questions";
      back.addEventListener("click", showAllSuggestions);
      messages.appendChild(back);
      messages.scrollTop = messages.scrollHeight;
    } else {
      addMessage("J'ai trouvé plusieurs sujets qui correspondent :", "bot");
      showSuggestions(results);
    }
  }

  /* ─── ÉVÉNEMENTS ─── */
  toggle.addEventListener("click", () => {
    const isOpen = win.classList.toggle("open");
    if (isOpen) {
      badge.style.display = "none";
      if (!messages.children.length) showWelcome();
      setTimeout(() => input.focus(), 200);
    }
  });

  closeBtn.addEventListener("click", () => win.classList.remove("open"));

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", e => { if (e.key === "Enter") handleSend(); });

})();
