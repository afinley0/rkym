import React from 'react';
import MentorBlock from './MentorBlock.jsx';

export default class MentorList extends React.Component {
    render() {
        const mentors = this.props.mentors.map(mentor => <MentorBlock key={mentor.directory} mentor={mentor} />);

        return <div>{mentors}<br /></div>
    }
}