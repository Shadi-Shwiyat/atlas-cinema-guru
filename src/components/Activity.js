import React from "react";
import './components.css';

export default function Activity({
  activity,
}) {
  // Converts date from activity to formatted date for li element
  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <li className="activity-element">
      <p><span>{activity.user.username}</span> {activity.activityType == 'favorite' ? 'added' : 'removed'} <span>{activity.title.title}</span> to {activity.activityType == 'favorite' ? 'favorites' : 'watch later'} - {formatDate(activity.updatedAt)}</p>
    </li>
  )
}
