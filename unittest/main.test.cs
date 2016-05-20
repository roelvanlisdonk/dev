using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace unittest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var current = new DateTime(2016, 2, 20, 10, 10, 10);
            var nextDay = current.AddDays(1).Date;
            var expire = nextDay.Add(new TimeSpan(4, 0, 0));
            Assert.AreEqual(new DateTime(2016, 2, 21, 4, 0, 0), expire);

        }
    }
}
