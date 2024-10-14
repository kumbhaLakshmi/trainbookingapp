export const CONSTANT = {
    EndPoinds: {
        GetAllStations: 'getallstations',
        PostRegisterDetails: 'register',
        GetStationResults: 'getstationresults',
        GetStationSearchResults: 'getstationsearchresults',
        Login: "login",
        CreateJourneyStations: "createjourneystations",
        FilterStations: "filterstations",
        PassengerBookTickets: "passengerbooktickets",
        SearchIncludes: (fromStation: string) => `searchIncludes?fromStation=${encodeURIComponent(fromStation)}`,
        SearchIncludesToStation: (toStation: string) => `searchIncludesTOStation?toStation=${encodeURIComponent(toStation)}`,
        CreateTiers:"createtiers",
        GetTiers:"gettiers",
        AddAllPassengers:"addAllPassengers",
        VerifyOpt:"verifyOtpCheck",
        GenerateOtp:""
    }
}   