import React from 'react'

function page({params}: {params: {id: string}}) {
    const {id} = params;
    return (
        <div>Session Labrary</div>
    )
}

export default page