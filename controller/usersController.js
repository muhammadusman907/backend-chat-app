const { AuthModal } = require("../modals/authModal.js");

const getUsers = async (req, res) => {
  try {
    const getAllUsers = await AuthModal.find({
      _id: { $ne: req.params.id },
    }).select("-password");
    res.status(200).send(getAllUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const singleUser = await AuthModal.findOne({ _id: req.params.id });
    res.status(200).send({ status: "200", singleUser });
  } catch (error) {
    console.error("Error fetching single user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { getUsers, getSingleUser };
