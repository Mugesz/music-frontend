import axios from "axios";

const baseURL = "https://mugesh-musicapp.onrender.com/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtist = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artists/getAll`);
    console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    return null;
  }
};


export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);

    return res.data;
  } catch (error) {
    return null;
  }
};
export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getAll`);
    // console.log("get all songs:",res.data.songs)
    return res.data.songs; 
  
  } catch (error) {
    console.error("Error fetching songs:", error);
    return null;
  }
};


export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/albums/getAll`);

    return res.data;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = await axios.post(`${baseURL}api/songs/save`, { ...data });
    return res.data.saveSong;
  } catch (error) {
    console.error("Error saving song:", error);
    console.log("Request payload:", data);
    console.log("Error response:", error.response);
    throw error; // Rethrow the error to handle it at the calling site
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/albums/save`, { ...data });
    return (await res).data.album;
  } catch (error) {
    return null;
  }
};


export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/artists/save`, { ...data });
    return (await res).data.artist;
  } catch (error) {
    return null;
  }
};

export const deleteSongById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/songs/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteAlbumById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/albums/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteArtistById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/artists/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

