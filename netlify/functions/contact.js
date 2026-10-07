const supabase = require("./supabase");


exports.handler = async function (event) {

    if (event.httpMethod !== "POST") {

        return {
            statusCode: 405,

            body: JSON.stringify({
                error: "Method not allowed"
            })
        };

    }


    try {

        const data =
            JSON.parse(event.body);


        const {
            name,
            email,
            message
        } = data;


        if (!name || !email || !message) {

            return {
                statusCode: 400,

                body: JSON.stringify({
                    error: "All fields are required."
                })
            };

        }


        const { error } =
            await supabase

                .from("contact_messages")

                .insert([
                    {
                        name,
                        email,
                        message
                    }
                ]);


        if (error) {

            console.error(error);

            return {
                statusCode: 500,

                body: JSON.stringify({
                    error: "Database error."
                })
            };

        }


        return {

            statusCode: 200,

            body: JSON.stringify({
                success: true,
                message: "Message saved successfully."
            })

        };


    } catch (error) {

        console.error(error);

        return {

            statusCode: 500,

            body: JSON.stringify({
                error: "Server error."
            })

        };

    }

};
