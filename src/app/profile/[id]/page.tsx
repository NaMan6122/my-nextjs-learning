export default function UserProfile({params}: any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl mb-2">Profile</h1>
            <hr />
            <hr/>
            <p className="text-3xl">Profile Page
            <span className="p-2 ml-2 mt-2 rounded bg-orange-600 text-black">{params.id}</span>
            </p>
        </div>
    )
}