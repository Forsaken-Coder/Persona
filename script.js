const contactForm = document.getElementById("contactForm");

const contactStatus =
    document.getElementById("contactStatus");


if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value;

        const email =
            document.getElementById("contactEmail").value;

        const message =
            document.getElementById("contactMessage").value;


        contactStatus.textContent = "Sending...";


        try {

            const response = await fetch(
                "/.netlify/functions/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        message
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    data.error || "Something went wrong."
                );
            }


            contactStatus.textContent =
                "Message saved successfully!";

            contactForm.reset();


        } catch (error) {

            console.error(error);

            contactStatus.textContent =
                "Failed to save message.";

        }

    });

}
