const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

// 在這裡的/全部都是api/members起頭

// get all members
router.get("/", (req, res) => {
  res.json(members);
});

// GET single member
router.get("/:id", (req, res) => {
  const found = members.some((e) => {
    return e.id == parseInt(req.params.id);
  });
  if (found) {
    res.json(
      members.filter((e) => {
        return e.id == parseInt(req.params.id);
      })
    );
  } else {
    res.status(400).json({ msg: `no member w the id of ${req.params.id}` });
  }
});

// POST / create member
router.post("/", (req, res) => {
  // res.send(req.body);

  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include a name and email." });
  }

  members.push(newMember);

  //  res.json(members); 表單送出後會轉移到 members/api
  res.redirect("/"); // 要重新導向
});

// PUT update single member (跟 get 很像，唯一差異是put，找到之後要更新)
router.put("/:id", (req, res) => {
  // return true/false
  const found = members.some((e) => {
    return e.id == parseInt(req.params.id);
  });
  if (found) {
    const updateMem = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        // 檢查是否收到new name，收到更新，沒收到照舊
        member.name = updateMem.name ? updateMem.name : member.name;
        member.email = updateMem.email ? updateMem.email : member.email;

        res.json({ msg: "updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `no member w the id of ${req.params.id}` });
  }
});

// DELETE single member
router.delete("/:id", (req, res) => {
  // return true/false
  const found = members.some((e) => {
    return e.id == parseInt(req.params.id);
  });
  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter((e) => e.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `no member w the id of ${req.params.id}` });
  }
});

module.exports = router;
