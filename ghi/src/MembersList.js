import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCommunity } from './CommunityProfile';


export async function fetchMembers(community_id) {
    const url = `${process.env.REACT_APP_API_HOST}/api/members/${community_id}`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return data;
    };
    throw Error(`Could not fetch members ${response}`)
}


function MembersList() {
    const [members, setMembers] = useState([]);
    const [community, setCommunity] = useState({});
    const { community_id } = useParams();

    useEffect(() => {
        fetchCommunity(community_id).then((data) => setCommunity(data));
        fetchMembers(community_id).then((data) => setMembers(data));
    }, []);

    return(
        <div>
        <h1>{community.name}</h1>
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Members</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => {
                        return (
                            <tr key={member.id}>
                                <td>{member.first_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default MembersList;
