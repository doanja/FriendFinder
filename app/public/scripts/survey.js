// when the user clicks submit...
$("#submit").on("click", e => {
  e.preventDefault();

  // check to make sure user completed the form
  if (!$("#name").val() || !$("#photo").val() || !checkQuestions()) {
    alert("You must finish the form.");
  } else {
    const newProfile = createNewProfile();

    // post the new profile to the server
    axios.post("/api/friends", { profile: newProfile }).then(res => {
      console.log("Profile successsfully created.");
    }),
      err => {
        console.log(err);
      };

    // render modal with the matched profile
    axios.get(`/api/friends/${newProfile.scoreTotal}`).then(res => {
      renderModal(res.data);
    }),
      err => {
        console.log(err);
      };
  }
});

const checkQuestions = () => {
  const inputs = $(".question");
  for (let i = 0; i < inputs.length; i++) {
    if (parseInt($(inputs[i]).val()) === 0) {
      return false;
    }
  }
  return true;
};

// function to create the profile to post to the server
const createNewProfile = () => {
  // grabs the scores and store them in score array
  const inputs = $(".question");
  let scores = [];
  let scoreTotal = 0;

  // loop through scores array and add them to the score array and calc total score
  for (let i = 0; i < inputs.length; i++) {
    scores.push(parseInt($(inputs[i]).val()));
    scoreTotal += parseInt($(inputs[i]).val());
  }

  // profile to be posted containing the form inputs
  return {
    name: $("#name")
      .val()
      .trim(),
    photo: $("#photo")
      .val()
      .trim(),
    scores: scores,
    scoreTotal: scoreTotal
  };
};

/**
 * function to render the modal
 * @param {object} profile the profile to be shown in the modal
 */
const renderModal = profile => {
  const modalFade = $("<div>", { id: "modal" }).css("z-index", 5);
  const modalDiaglogue = $("<div>", { class: "modal-dialog" });
  const modalContent = $("<div>", { class: "modal-content" });
  const modalHeader = $("<div>", { class: "modal-header" });
  const modalTitle = $("<h5>", { class: "modal-title" }).text(
    `Matched with ${profile.name}!`
  );
  const modalImg = $("<img>", {
    class: "p-5 mx-auto profile-photo",
    src: profile.photo
  });
  const modalprefooter = $("<div>", { class: "modal-footer" });
  const button = $("<button>", {
    class: "btn btn-primary",
    id: "modal-button"
  }).text("Close");

  $(".container").prepend(modalFade);
  modalFade.append(modalDiaglogue);
  modalDiaglogue.append(modalContent);
  modalContent.append(modalHeader, modalImg, modalprefooter);
  modalHeader.append(modalTitle);
  modalprefooter.append(button);

  clickModal();
};

// function to handle clicks on the modal to show/hide it
const clickModal = () => {
  // Get the modal
  const modal = document.getElementById("modal");

  // when the user clicks the close button in the modal, close modal
  $("#modal-button").click(() => {
    location.reload();
    $("#modal").remove();
  });

  // when the user clicks anywhere outside of the modal, close modal
  window.onclick = e => {
    if (e.target == modal) {
      location.reload();
      $("#modal").remove();
    }
  };
};
