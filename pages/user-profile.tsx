export async function getServerSideProps(context: any) {
    const { params, req, res } = context;

    return {
        props: {
            username: "Max"
        }
    };
}

export default function UserProfile(props: any) {
    return (
        <h1>{props.username}</h1>
    );
}