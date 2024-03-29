const User = require('../models/user.model');

module.exports = {
  async index(req, res){
    const user = await User.find();
    res.json(user);
  },
  async create(req, res){
    const { user_name, user_email, user_type, user_password, user_health_info, user_contact_info } = req.body;

    let data = {};
    let user = await User.findOne({user_email});

    if(!user){
      data = {user_name, user_email, user_type, user_password, user_health_info, user_contact_info};
      user = await User.create(data);
      return res.status(200).json(user);
    }else{
      return res.status(500).json(user);
    }

  },
  async details(req, res){
    const { _id } = req.params;
    const user = await User.findOne({ _id });
    res.json(user);
  },
  async delete(req, res){
    const { _id } = req.params;
    const user = await User.findByIdAndDelete({ _id });
    return res.json(user);
  },
  async update(req, res){
    const { _id, user_name, user_email, user_type, user_password, user_health_info, user_contact_info } = req.body;
    const data = { user_name, user_email, user_type, user_password, user_health_info, user_contact_info };
    const user = await User.findOneAndUpdate({ _id }, data, { new:true });
    res.json(user);
  }
}