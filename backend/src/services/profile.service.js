const supabase = require("../config/supabase");

/* GET profile with all blocks */
async function getProfileByUser(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select(`
      *,
      profile_blocks (*)
    `)
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
}

/* CREATE profile */
async function createProfile(profile) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([profile])
    .single();

  if (error) throw error;
  return data;
}

/* ADD block */
async function addProfileBlock(profileId, block) {
  const { data, error } = await supabase
    .from("profile_blocks")
    .insert([{ profile_id: profileId, ...block }])
    .single();

  if (error) throw error;
  return data;
}

module.exports = {
  getProfileByUser,
  createProfile,
  addProfileBlock,
};
