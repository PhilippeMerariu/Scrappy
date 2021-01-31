import axios from 'axios';

export function getUserGroups() {
    return axios.get('user-groups');
}

export function getGroupUsers(groupId) {
    return axios.get('group-users/' + groupId);
}

export function postGroup(file, name) {
    let formData = new FormData();
    formData.append('image_group', file);
    formData.append('name', name);

    return axios.post('group', formData);
}

export function getContents(groupId) {
    return axios.get('group-content/' + groupId);
}

export function postContent(groupId, file, caption) {
    let formData = new FormData()
    formData.append('file', file);
    formData.append('caption', caption);
    return axios.post('content/' + groupId, formData);
}

export function postInvite(groupId, email) {
    return axios.post('invite/' + groupId, {
        email
    });
}

export function getUserInvites() {
    return axios.get('user-invites');
}

export function patchInvite(inviteId, status) {
    return axios.patch('invite/' + inviteId, {status});
}

export function leaveGroup(groupId) {
    return axios.post('group/leave/' + groupId);
}
