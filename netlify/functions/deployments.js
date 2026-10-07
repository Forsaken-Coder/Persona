const supabase = require("./supabase");


exports.handler = async function (event) {

    try {


        if (event.httpMethod === "GET") {

            const { data, error } =
                await supabase

                    .from("deployments")

                    .select("*")

                    .order(
                        "created_at",
                        {
                            ascending: false
                        }
                    );


            if (error) {

                return {

                    statusCode: 500,

                    body: JSON.stringify({
                        error: error.message
                    })

                };

            }


            return {

                statusCode: 200,

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(data)

            };

        }


        if (event.httpMethod === "POST") {

            const {
                project_name,
                platform,
                status,
                live_url
            } = JSON.parse(event.body);


            if (
                !project_name ||
                !platform ||
                !status
            ) {

                return {

                    statusCode: 400,

                    body: JSON.stringify({
                        error:
                            "Project, platform and status are required."
                    })

                };

            }


            const { data, error } =
                await supabase

                    .from("deployments")

                    .insert([
                        {
                            project_name,
                            platform,
                            status,
                            live_url
                        }
                    ])

                    .select();


            if (error) {

                return {

                    statusCode: 500,

                    body: JSON.stringify({
                        error: error.message
                    })

                };

            }


            return {

                statusCode: 201,

                body: JSON.stringify(data)

            };

        }


        return {

            statusCode: 405,

            body: JSON.stringify({
                error: "Method not allowed"
            })

        };


    } catch (error) {

        console.error(error);


        return {

            statusCode: 500,

            body: JSON.stringify({
                error: "Server error"
            })

        };

    }

};
