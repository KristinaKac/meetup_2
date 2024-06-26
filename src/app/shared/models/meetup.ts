export interface IMeetup {
    id: number,
    name: string,
    description: string,
    location: string,
    target_audience: string,
    need_to_know: string,
    will_happen: string,
    reason_to_come: string,
    time: string,
    duration: number,
    createdBy: number | Array<number>,
    owner: {
        id: number,
        email: string,
        password: string,
        fio: string
    },
    users: [
        {
            id: number,
            email: string,
            password: string,
            fio: string
        }
    ] | []
}
export interface IFilterMeetupItems {
        key: string,
        title: string
}

