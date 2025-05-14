const Tasks = require("../models/tasks");
const moment = require("moment");

const dashboard = async (req, res) => {
  let { userId } = req.params;
  const allTaskList = await Tasks.find({ userId });

  const completedTasks = await Tasks.find({
    $and: [{ userId: userId }, { status: "completed" }],
  });
  let countCompletedOnTime = 0,
    notCompletedOnTime = 0,
    gap = [],
    weeklyTaskCount = {},
    i = 0;

  completedTasks.forEach((task) => {
    const weekNum = moment(task.completedOn).format("GGGG-[W]WW");

    if (!weeklyTaskCount[weekNum]) {
      weeklyTaskCount[weekNum] = 1;
    } else {
      weeklyTaskCount[weekNum]++;
    }
  });

  let weekId = [],
    weekTaskCompCount = [];
  for (let key in weeklyTaskCount) {
    weekId.push(key);
    weekTaskCompCount.push(weeklyTaskCount[key]);
  }

  console.log(weekId);
  console.log(weekTaskCompCount)

  for (let ele of completedTasks) {
    let difference = Math.floor(
      Math.abs(ele.completedOn - ele.DOE) / (1000 * 24 * 60 * 60)
    );

    if (ele.DOE - ele.completedOn >= 0) {
      countCompletedOnTime++;
      gap.push({ idx: i++, difference: difference, compStatus: "onTime" });
    } else {
      notCompletedOnTime++;
      gap.push({ idx: i++, difference: difference, compStatus: "Late" });
    }
  }

  const onTimeCompletionRate =
    gap.length === 0 ? 0 : (countCompletedOnTime / gap.length) * 100;

  const avgDelay =
    gap.length > 0
      ? gap.reduce((sum, g) => sum + g.difference, 0) / gap.length
      : 0;

  res.render("dashboard.ejs", {
    gap,
    countCompletedOnTime,
    notCompletedOnTime,
    onTimeCompletionRate: onTimeCompletionRate.toFixed(2),
    userId,
    avgDelay,
    weekTaskCompCount,
    weekId
  });
};

module.exports = { dashboard };
